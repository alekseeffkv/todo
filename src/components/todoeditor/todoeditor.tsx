import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  set,
} from 'firebase/database';
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { firebaseApp, storage } from '../../firebase';
import Button from '../button';
import './todoeditor.less';
import { AddAction, AttachedFile, EditAction, Todo } from '../../types';
import Loader from '../loader';

const defaultValues = {
  title: '',
  description: '',
  completionDate: '',
};

type TodoEditorProps = {
  action: AddAction | EditAction;
  closeEditor(): void;
};

const TodoEditor: FC<TodoEditorProps> = ({ action, closeEditor }) => {
  const [values, setValues] = useState(defaultValues);
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [isLoading, setLoading] = useState(false);

  const { title, description, completionDate } = values;

  const { type } = action;

  const db = getDatabase(firebaseApp);

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFiles = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;

    setFiles(Array.from(files).map(({ name }) => ({ name, url: '' })));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const target = e.target as typeof e.target & {
      attachedFiles: { files: FileList | null };
    };

    const fileList = Array.from(target.attachedFiles.files || []);
    const promises: Promise<AttachedFile>[] = [];

    const uploadFileAsPromise = (file: File): Promise<AttachedFile> => {
      return new Promise((resolve, reject) => {
        const { name } = file;
        const fileRef = storageRef(storage, `files/${name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
          'state_changed',
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve({ name, url: downloadURL });
            });
          }
        );
      });
    };

    fileList.forEach((file) => {
      promises.push(uploadFileAsPromise(file));
    });

    Promise.all(promises)
      .then((resolve) => {
        if (type === 'add') {
          const todoRef = ref(db, '/todos');

          const todo = {
            title: title.trim(),
            description: description.trim(),
            done: false,
            completionDate,
            attachedFiles: resolve,
          };

          push(todoRef, todo);
        } else {
          const { id } = action;
          const todoRef = ref(db, `/todos/${id}`);
          const attachedFilesRef = ref(db, `/todos/${id}/attachedFiles`);

          update(todoRef, {
            title: title.trim(),
            description: description.trim(),
            completionDate,
          });

          if (resolve.length > 0) set(attachedFilesRef, resolve);
        }

        closeEditor();
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (type === 'edit') {
      const { id } = action;
      const todoRef = ref(db, `/todos/${id}`);

      onValue(
        todoRef,
        (snapshot) => {
          const {
            title,
            description,
            completionDate,
            attachedFiles,
          }: Omit<Todo, 'id'> = snapshot.val();

          setValues({ title, description, completionDate });
          setFiles(attachedFiles || []);
        },
        { onlyOnce: true }
      );
    }
  }, [action, db, type]);

  return (
    <>
      {isLoading && <Loader />}

      <div className="todo-editor">
        <form onSubmit={handleSubmit} className="todo-editor__form">
          <h3>{type === 'add' ? 'Новая задача' : 'Редактирование задачи'}</h3>

          <div className="todo-editor__field">
            <label htmlFor="title">Название</label>
            <input
              type="text"
              name="title"
              id="title"
              tabIndex={1}
              placeholder="Сделать тестовое задание"
              required
              value={title}
              onChange={handleChange}
            />
          </div>

          <div className="todo-editor__field">
            <label htmlFor="description">Описание</label>
            <textarea
              name="description"
              id="description"
              tabIndex={2}
              placeholder="Сверстать UI, написать логику и развернуть на хостинге"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="todo-editor__field">
            <label htmlFor="completionDate">Дата завершения</label>
            <input
              type="date"
              name="completionDate"
              id="completionDate"
              tabIndex={3}
              value={completionDate}
              onChange={handleChange}
            />
          </div>

          <div className="todo-editor__field">
            <label>Прикрепленные файлы</label>

            {files.length > 0 && (
              <ul>
                {files.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            )}

            <label htmlFor="attachedFiles">Выбрать файлы</label>
            <input
              type="file"
              name="attachedFiles"
              id="attachedFiles"
              multiple
              onChange={handleFiles}
            />
          </div>

          <div className="todo-editor__control">
            <Button buttonProps={{ type: 'submit' }}>
              {type === 'add' ? 'Создать' : 'Сохранить'}
            </Button>

            <Button buttonProps={{ type: 'button', onClick: closeEditor }}>
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TodoEditor;
