# GitHub Repositories Explorer

GitHub Repositories Explorer is a project designed to help users explore and manage GitHub repositories efficiently. It provides an intuitive interface to search, view, and interact with repositories, making it easier to navigate through GitHub's vast ecosystem.

## Features

- **Search Repositories**: Quickly search for repositories by name or keyword.
- **View Repository Details**: Access detailed information about repositories, including description, stars, and forks.
- **User-Friendly Interface**: A clean and responsive UI for seamless navigation.
- **Global error and loading handler**: A clean and responsive UI for seamless navigation.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/github-repositories-explorer.git
```

2. Navigate to the project directory:

```bash
cd github-repositories-explorer
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Use the search bar to find repositories.
3. Click on a repository to view its details.
4. Bookmark repositories for future reference.

## Technologies Used

- **Frontend**: React, Material UI, Sass
- **API**: GitHub REST API
- **Client State Management**: Zustand
- **Server State Management**: ReactQuery

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature-name
```

3. Commit your changes:

```bash
git commit -m "Add feature-name"
```

4. Push to your branch:

```bash
git push origin feature-name
```

5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to the GitHub API for providing the data.
- Inspired by the need for better repository exploration tools.

## Notes

- Because GitHub pages not fully support SPA index.html fils (where all route will be in one index.html file), so I decide not to handle that.
- So, we cannot reload the page if we are on the subroute `domain/main-route/sub-route`, this will return a 404 page.
- Actually there many workaround that I can try, maybe I will do that in the future.
