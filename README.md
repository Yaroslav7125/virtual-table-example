# vite-template-redux

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

```sh
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Goals

- Easy migration from Create React App or Vite
- As beginner friendly as Create React App
- Optimized performance compared to Create React App
- Customizable without ejecting

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)




Создайте одностраничное приложение “Список компаний”, используя библиотеку React.js.  
Требования: react, redux(redux-toolkit), typescript, остальное на ваше усмотрение, НО стоит использовать минимальное кол-во библиотек(например, таблицу нужно точно сделать самостоятельно, без сторонних библиотек)  
Дано: Имеется таблица со списком компаний. Данные в таблице должны храниться в сторе.  
Данные для таблицы - фейковые, создать самостоятельно.  
Шапка таблицы "компании": Чекбокс “Выделить всё”  
Тело таблицы имеет столбцы: | Чекбокс | Название компании  | Адрес  
При клике по чекбоксу в строке, соответствующая строка выделяется цветом на ваше усмотрение. При клике по чекбоксу “Выделить всё” - выделяются все строки.  
Все поля таблицы редактируемые .  
В таблице реализовать механизм добавления/удаления компаний по соответствующим кнопкам. Удаление может быть множественное(если выделены несколько строк).  
 
Готовый проект нужно разместить в репозитории на Github или Gitlab.  
Будет плюсом: предусмотреть вариант когда компаний может быть 10 000+(желательно предложить вариант без переключения по страницам, динамическая загрузка при скролле)  
 
Примечания:  
Желательно использовать минимум сторонних библиотек.  
Дизайн приложения  на ваш вкус. Выполнение всех пунктов не является обязательным, но желательным. Чем точнее будет выполнено тестовое задание, тем у вас больше шансов получить положительный ответ.
