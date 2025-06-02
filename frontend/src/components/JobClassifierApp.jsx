import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Loader, Briefcase } from 'lucide-react';

const JobClassifierApp = () => {
  const [formData, setFormData] = useState({
    title: '',
    company_profile: '',
    description: '',
    requirements: '',
    benefits: ''
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to classify job posting');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message + '. Make sure the Flask API is running on localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company_profile: '',
      description: '',
      requirements: '',
      benefits: ''
    });
    setResult(null);
    setError(null);
  };

  const fillSampleData = () => {
    setFormData({
      title: 'Software Engineer',
      company_profile: 'Leading tech company with 10+ years in the industry',
      description: 'We are looking for a passionate software engineer to join our team. You will work on cutting-edge projects and collaborate with talented developers.',
      requirements: 'Bachelor\'s degree in Computer Science, 3+ years of experience with Python, JavaScript, and React',
      benefits: 'Competitive salary, health insurance, dental coverage, 401k matching, flexible work hours'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Job Posting Classifier</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Detect fake job postings using machine learning
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Job Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Software Engineer, Marketing Manager"
                required
              />
            </div>

            {/* Company Profile */}
            <div>
              <label htmlFor="company_profile" className="block text-sm font-medium text-gray-700 mb-2">
                Company Profile
              </label>
              <textarea
                id="company_profile"
                name="company_profile"
                value={formData.company_profile}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Brief description of the company..."
              />
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Detailed description of the job role and responsibilities..."
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Skills, experience, and qualifications required..."
              />
            </div>

            {/* Benefits */}
            <div>
              <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-2">
                Benefits
              </label>
              <textarea
                id="benefits"
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Benefits offered to employees..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin w-5 h-5 mr-2" />
                    Analyzing...
                  </>
                ) : (
                  'Classify Job Posting'
                )}
              </button>
              
              <button
                type="button"
                onClick={fillSampleData}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Fill Sample Data
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Reset Form
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Classification Result</h3>
              
              <div className={`flex items-center mb-4 p-4 rounded-lg ${
                result.prediction === 'Real' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {result.prediction === 'Real' ? (
                  <CheckCircle className="w-6 h-6 mr-3" />
                ) : (
                  <AlertTriangle className="w-6 h-6 mr-3" />
                )}
                <span className="text-lg font-semibold">
                  This job posting appears to be {result.prediction.toUpperCase()}
                </span>
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Real Job Probability</h4>
                  <div className="bg-green-200 rounded-full h-4 mb-2">
                    <div 
                      className="bg-green-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${result.real_probability}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {result.real_probability !== undefined ? `${result.real_probability.toFixed(1)}%` : 'N/A'}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Fake Job Probability</h4>
                  <div className="bg-red-200 rounded-full h-4 mb-2">
                    <div 
                      className="bg-red-500 h-4 rounded-full transition-all duration-500"
                      style={{ 
                        width: (typeof result.fake_probability === 'number') 
                          ? `${result.fake_probability}%` 
                          : '0%' 
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {(typeof result.fake_probability === 'number') 
                      ? `${result.fake_probability.toFixed(1)}%` 
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Confidence Level:</strong> {(typeof result.confidence === 'number') ? result.confidence.toFixed(1) + '%' : 'N/A'}
                </p>
              </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="bg-white p-4 rounded-lg shadow">
    <h4 className="font-medium text-gray-700 mb-2">Real Job Probability</h4>
    <div className="bg-green-200 rounded-full h-4 mb-2 overflow-hidden">
      <div 
        className="bg-green-500 h-4 rounded-full transition-all duration-500"
        style={{ width: `${result.real_probability || 0}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-600">
      {typeof result.real_probability === 'number' 
        ? `${result.real_probability.toFixed(2)}%`
        : 'N/A'}
    </p>
  </div>

  <div className="bg-white p-4 rounded-lg shadow">
    <h4 className="font-medium text-gray-700 mb-2">Fake Job Probability</h4>
    <div className="bg-red-200 rounded-full h-4 mb-2 overflow-hidden">
      <div 
        className="bg-red-500 h-4 rounded-full transition-all duration-500"
        style={{ width: `${result.fake_probability || 0}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-600">
      {typeof result.fake_probability === 'number' 
        ? `${result.fake_probability.toFixed(2)}%`
        : 'N/A'}
    </p>
  </div>
</div>

<div className="mt-4 p-4 bg-blue-50 rounded-lg">
  <p className="text-sm text-blue-800">
    <strong>Confidence Level:</strong> {(typeof result.confidence === 'number') ? result.confidence.toFixed(1) + '%' : 'N/A'}
  </p>
</div>

{result.confidence < 40 && (
  <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg">
    <strong>Warning:</strong> Low confidence in prediction. This job may still be suspicious.
  </div>
)}



            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default JobClassifierApp;
