# SIIGA Frontend (Vue.js)

This is the frontend application for the School Management System (SIIGA), built with Vue.js. It provides an intuitive and responsive user interface for managing students, parents, and payments.

## Features

* Student module: create, edit, view, and delete student records.
* Parent module: manage parent or guardian information linked to students.
* Payment module: track and manage student payments and receipts.
* Dashboard: quick overview of system activity and key data.
* Responsive UI: optimized for desktop and tablet usage.

## Technologies Used

* **Vue.js**: JavaScript framework for building the user interface.
* **Vue Router**: for handling application routing.
* **Axios**: for communicating with the backend API.
* **Vite / Webpack**: for fast development and build process (depending on setup).
* **Bootstrap / Tailwind CSS** (optional): for styling.

## Project Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:

   ```bash
   cd siiga-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Environment Configuration

Create a `.env` file in the root of the project and configure the API endpoint:

```env
VITE_API_URL=http://localhost:8000/api
```

## Development

Run the development server:

```bash
npm run dev
```

The application will be available at:

```bash
http://localhost:5173
```

## Build for Production

To build the application for production:

```bash
npm run build
```

The compiled files will be generated in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
│── assets/        # Static files
│── components/    # Reusable components
│── views/         # Application views/pages
│── router/        # Route definitions
│── services/      # API calls (Axios)
│── store/         # State management (if using Vuex/Pinia)
│── App.vue        # Root component
│── main.js        # Entry point
```

## Usage

Make sure the backend (Laravel API) is running before starting the frontend.

Once both are running:

* Open the frontend URL in your browser
* Log in using valid credentials
* Start managing students, parents, and payments

## Contribution

To contribute:

1. Fork the repository
2. Create a new branch:

   ```bash
   git checkout -b feature/feature-name
   ```
3. Make your changes and commit:

   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:

   ```bash
   git push origin feature/feature-name
   ```
5. Create a Pull Request

## License

This project is licensed under the MIT License.
