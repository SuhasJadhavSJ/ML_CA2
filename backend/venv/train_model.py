import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import joblib

# Load and clean the dataset
df = pd.read_csv("fake_job_detection_dataset.csv")
df = df.dropna(subset=["title", "company_profile", "description", "requirements", "benefits", "fraudulent"])

# Combine text fields
df["text"] = (
    df["title"] + " "
    + df["company_profile"] + " "
    + df["description"] + " "
    + df["requirements"] + " "
    + df["benefits"]
)
X = df["text"]
y = df["fraudulent"]

# Create pipeline with balanced class weights
pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(stop_words="english", max_features=10000)),  # optional: increase features
    ("clf", LogisticRegression(class_weight='balanced', max_iter=1000))
])

# Train and save model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
pipeline.fit(X_train, y_train)

# Save model
joblib.dump(pipeline, "svm_fake_job_model.pkl")  # or rename to match algorithm
print("Model trained and saved as svm_fake_job_model.pkl")
