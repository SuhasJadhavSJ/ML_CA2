from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

# Load model
pipeline = joblib.load("svm_fake_job_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    combined_text = (
        data["title"] + " "
        + data["company_profile"] + " "
        + data["description"] + " "
        + data["requirements"] + " "
        + data["benefits"]
    )

    proba = pipeline.predict_proba([combined_text])[0]
    fake_prob = proba[1]
    real_prob = proba[0]

    # Override logic: If fake prob >= 40%, mark as Fake
    prediction = 1 if fake_prob >= 0.30 else 0

    return jsonify({
        "prediction": "Fake" if prediction == 1 else "Real",
        "fake_probability": round(proba[1] * 100, 2),  # probability of being Fake
        "real_probability": round(proba[0] * 100, 2),  # probability of being Real
        "confidence": round(max(proba) * 100, 2)       # highest confidence
    })
    print("Fake Probability:", fake_prob)
    print("Real Probability:", real_prob)


if __name__ == "__main__":
    print("Starting Flask API server...")
    print("API will be available at: http://localhost:5000")
    print("Endpoints:")
    print("- POST /predict - Predict job posting authenticity")
    print("- GET /health - Health check")
    app.run(debug=True, host='0.0.0.0', port=5000)
