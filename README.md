Створено репозиторій 06-notehub-nextjs. При здачі роботи надаються два
посилання: на вихідні файли (репозиторій) та на робочу сторінку завдання,
розгорнуту на Vercel. Проєкт створено за допомогою Next.js (App Router). Усі
компоненти, які не прив'язані безпосередньо до маршруту та їх частин,
зберігаються в папці components, кожен – у власній папці з такою ж назвою як і
компонент, та з файлами:

1. файл компонента з розширенням .tsx (наприклад, Header.tsx);

2. файл стилів з такою самою назвою, що й компонент, з розширенням .module.css
   (наприклад, Header.module.css).

Загальні типи та інтерфейси винесені до файлу types/note.ts. Функції роботи з
API винесені в lib/api/ у вигляді окремих модулів. Для HTTP-запитів
використовується бібліотека axios. Стан запитів у CSR-компонентах керується
через TanStack Query (React Query). Усі компоненти типізовані з використанням
TypeScript. Код має бути відформатований за допомогою Prettier. Стилізація – за
допомогою CSS Modules. У проєкті реалізована підтримка SSR та CSR, відповідно до
завдання. Після змін, які вносите у своєму репозиторії, почекайте, будь ласка, 5
хвилин перед відправкою роботи на перевірку. Адже гітхабу необхідний час, щоб
оновити версію

Додаток NoteHub

У вас уже є додаток NoteHub, створений у попередньому (5-му) домашньому
завданні. Тепер вам потрібно виконати його рефакторинг, зробити його
багатосторінковим і перенести проєкт на Next.js.

Структура сторінок

У попередній версії NoteHub був односторінковим додатком (SPA). Тепер потрібно
реалізувати багатосторінкову структуру з використанням маршрутизації Next.js. У
додатку мають бути реалізовані такі маршрути:

/ – головна сторінка з загальною інформацією про застосунок. /notes – сторінка
списку нотатків. На цій сторінці відображається перелік усіх створених нотаток.
Реалізовано функцію пошуку за ключовим словом, а також можливість створення
нової нотатки. /notes/[id] – сторінка деталей однієї нотатки (динамічний
маршрут). На цій сторінці відображається повна інформація про одну нотатку за її
id.

Головна сторінка

Додайте на головну сторінку вашого додатка загальну інформацію про нього:

<main>
  <div className={css.container}>
    <h1 className={css.title}>Welcome to NoteHub</h1>
    <p className={css.description}>
      NoteHub is a simple and efficient application designed for managing
      personal notes. It helps keep your thoughts organized and accessible
      in one place, whether you are at home or on the go.
    </p>
    <p className={css.description}>
      The app provides a clean interface for writing, editing, and browsing
      notes. With support for keyword search and structured organization,
      NoteHub offers a streamlined experience for anyone who values clarity
      and productivity.
    </p>
  </div>
</main>

Стилі для всіх компонентів і сторінок вже створені. Скопіюй їх із цього
репозиторію: https://github.com/goitacademy/react-notehub-styles/tree/hw-06.
Після створення своїх сторінок і компонентів скопіюй відповідні .module.css
файли у відповідні папки в /app.

Глобальний Layout

Усі сторінки вашого додатка мають мати спільний хедер і футер.

Створи для цього компоненти:

Header – має містити навігацію з лінками на сторінки Home та Notes. Footer – має
містити контактну інформацію розробника застосунку.

Компонент Header має створювати наступну розмітку. Для створення посилань в
навігації використовуй готовий компонент від Next.js.

<header className={css.header}>
  <a href="/" aria-label="Home">
    NoteHub
  </a>
  <nav aria-label="Main Navigation">
    <ul className={css.navigation}>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/notes">Notes</a>
      </li>
    </ul>
  </nav>
</header>

Компонент Footer має створювати наступну розмітку:

<footer className={css.footer}>
  <div className={css.content}>
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: your name</p>
      <p>
        Contact us:
        <a href="mailto:student@notehub.app">student@notehub.app</a>
      </p>
    </div>
  </div>
</footer>

API-запити

Весь вміст файлу src/services/noteService.ts з попередньої ДЗ перенесіть у файл
lib/api.ts.

Зверніть увагу, що env змінні в Next.js отримуються дещо інакше ніж було в Vite
і є вимога щодо назви env змінної. Змінна має починатись з NEXT_PUBLIC, тому
перейменуйте її на NEXT_PUBLIC_NOTEHUB_TOKEN. Також для отримання значення цієї
змінної вам потрібно замість import.meta.env.VITE_NOTEHUB_TOKEN використовувати
process.env.NEXT_PUBLIC_NOTEHUB_TOKEN.

Не забудьте також перенести в проєкт файл types/note.ts.

Сторінка списку нотатків

Весь вміст компонента App з попередньої ДЗ перенесіть на сторінку /notes. Усі
інші компоненти з попередньої ДЗ перенесіть у папку components.

Реалізуйте сторінковий компонент Notes у маршруті /notes як SSR-компонент, де
заздалегідь виконується prefetch (попереднє завантаження даних через TanStack
Query) з гідратацією кешу. Усю клієнтську логіку (отримання списку нотаток за
допомогою useQuery та їх відображення) винесіть в окремий файл компонента
app/notes/Notes.client.tsx.

Обробка помилок і завантаження

Реалізуйте обробку стану завантаження у файлі loading.tsx. Буде достатньо
створити один файл для всіх маршрутів і реалізувати у ньому створення наступної
розмітки:

<p>Loading, please wait...</p>

Реалізуйте обробку помилок для маршруту /notes у файлі error.tsx. Буде достатньо
в ньому створити наступну розмітку, описавши суть помилки:

<p>Could not fetch the list of notes. {error.message}</p>

Для перевірки, що опрацювання помилки працює коректно можете штучно створити
помилку, додавши будь-який зайвий символ у вашу env змінну
NEXT_PUBLIC_NOTEHUB_TOKEN.

Сторінка з деталями однієї нотатки

Внесіть зміну у розмітку компонента NoteList. Додайте на картку однієї нотатки
перед кнопкою Delete посилання View details. Це посилання буде вести на сторінку
з деталями конкретної нотатки.

Створіть динамічний маршрут для сторінки з деталями однієї нотатки за її id.

У файлі lib\api.ts створіть функцію fetchNoteById для отримання деталей однієї
нотатки за її ідентифікатором.

Реалізуйте сторінковий компонент NoteDetails у маршруті /notes/[id] як
SSR-компонент, де заздалегідь виконується prefetch (попереднє завантаження даних
через TanStack Query) з гідратацією кешу. Усю клієнтську логіку (отримання даних
нотатки за допомогою useQuery та їх відображення) винесіть в окремий файл
компонента app/notes/NoteDetails.client.tsx.

Для отримання динамічного id в клієнтському компоненті використовуйте хук
useParams().

Не забудьте про TanStackProvider:

Створіть в components\TanStackProvider\TanStackProvider.tsx компонент, який
додає QueryClientProvider. Підключіть його глобально в app/layout.tsx, щоб
забезпечити правильну роботу кешування та роботи з запитами через TanStack Query
в усіх компонентах вашого додатка.

Обов‘язково у клієнтському компоненті NoteDetailsClient опрацюйте стани
isLoading, error та випадок коли детальну інформацію по нотатці не було отримано
в клієнтському компоненті NoteDetailsClient. Поки що буде достатньо повернути
наступну розмітку:

// isLoading

<p>Loading, please wait...</p>

// error, !note

<p>Something went wrong.</p>;

Якщо нотатку за переданим айді було знайдено, то компонент NoteDetailsClient має
створювати наступну розмітку:

<div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>Note title</h2>
	  </div>
	  <p className={css.content}>Note content</p>
	  <p className={css.date}>Created date</p>
	</div>
</div>

Реалізуйте обробку помилок для маршруту /notes/[id] у файлі error.tsx. Буде
достатньо в ньому створити наступну розмітку, описавши суть помилки:

<p>Could not fetch note details. {error.message}</p>
