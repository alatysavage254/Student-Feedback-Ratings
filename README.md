# Student Feedback Tracker

A simple and intuitive React application for collecting and managing student feedback. This project allows users to submit feedback with a name, a comment, and a rating, and view all submissions in a clean, organized list.

## ✨ Features

- **Submit Feedback**: Add new feedback with student name, a detailed comment, and a rating from 1 to 5.
- **Feedback List**: View all submitted feedback cards, each showing the rating, name, and comment.
- **Delete Feedback**: Easily remove feedback entries from the list.
- **Toast Notifications**: Get instant visual confirmation for actions.
- **Responsive Design**: A clean and modern UI that works on all screen sizes.

## 🚀 Tech Stack

- **Frontend**: [React.js](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Built with [shadcn/ui](https://ui.shadcn.com/) for a consistent and accessible component library.

## 📦 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or newer)
- [pnpm](https://pnpm.io/installation) (or your preferred package manager like npm or yarn)

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/student-feedback.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd student-feedback
    ```
3.  Install the dependencies:
    ```bash
    pnpm install
    ```

### Running the Application

To start the development server, run the following command:

```bash
pnpm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal) to see the application in action.

## Usage

1.  Enter the student's name, feedback comment, and a rating in the form.
2.  Click the "Submit Feedback" button to add it to the list.
3.  To remove a feedback item, click the "X" button on the corresponding card.
