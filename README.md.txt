# 🕵️‍♂️ Fake Job Posting Classifier

This project is a **machine learning-powered web app** to detect fake job postings. It uses a **Logistic Regression** model trained on job posting data, with a React frontend and Flask API backend.

---

## 🧠 Features

- Classifies job postings as **Real** or **Fake**
- Displays **probabilities** and **confidence level**
- Warns users if confidence is low
- Includes **sample data** for quick testing
- Stylish and responsive UI using **Tailwind CSS** and **Lucide icons**

---

## 🧰 Technologies Used

### Backend
- Python
- Flask
- scikit-learn
- pandas
- joblib
- CORS (Flask-CORS)

### Frontend
- React
- Tailwind CSS
- Lucide React Icons

---

## 📦 Project Structure

fake-job-classifier/
├── backend/
│ ├── app.py # Flask API
│ ├── fake_job_detection_dataset.csv # Dataset
│ ├── model_training.py # Script to train and save the model
│ └── svm_fake_job_model.pkl # Trained model
└── frontend/
├── src/
│ └── JobClassifierApp.jsx # Main React component
├── public/
└── ...


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fake-job-classifier.git
cd fake-job-classifier


🔧 Backend Setup (Flask API)
Prerequisites

    Python 3.7+

    pip installed

Install dependencies

cd backend
pip install -r requirements.txt


requirements.txt
Flask
flask-cors
pandas
scikit-learn
joblib


Train the Model (optional)
python model_training.py


Run the Flask Server
python app.py


🎨 Frontend Setup (React)
Prerequisites

    Node.js (v14 or later)

    npm or yarn

Install dependencies
cd frontend
npm install

Start the React App
npm start

