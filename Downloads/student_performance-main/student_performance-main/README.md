
# Student Performance Prediction

## Table of Contents
- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Data Collection](#data-collection)
- [Data Validation](#data-validation)
- [Exploratory Data Analysis (EDA)](#exploratory-data-analysis-eda)
- [Data Preprocessing](#data-preprocessing)
- [Predictive Modeling](#predictive-modeling)
- [Model Evaluation](#model-evaluation)
- [Conclusion](#conclusion)
- [Future Work](#future-work)
- [References](#references)

## Introduction

The Indian Student Performance Prediction project aims to analyze and predict students' academic performance based on various socio-demographic and academic factors. By leveraging data analysis and machine learning techniques, this project seeks to provide insights into the factors influencing student performance and to develop a predictive model that can aid educators and policymakers in making informed decisions.

## Project Overview

This project encompasses several stages, including data collection, data validation, exploratory data analysis, data preprocessing, and predictive modeling. The primary goal is to predict students' grades based on features such as parental education, study time, tutoring, extracurricular activities, and more.

## Data Collection

The dataset used in this project consists of various attributes related to student performance. The data was collected from [source/website or method used, e.g., surveys, educational institutions, etc.], comprising information from [number of students] students.

### Dataset Features

The dataset includes the following columns:
- **StudentID**: Unique identifier for each student.
- **Age**: Age of the student.
- **Gender**: Gender of the student (Male/Female).
- **Ethnicity**: Ethnic background of the student.
- **ParentalEducation**: Education level of the parents.
- **StudyTimeWeekly**: Time spent studying weekly (in hours).
- **Absences**: Number of absences from school.
- **Tutoring**: Whether the student receives tutoring (Yes/No).
- **ParentalSupport**: Level of parental support (High/Medium/Low).
- **Extracurricular**: Participation in extracurricular activities (Yes/No).
- **Sports**: Participation in sports (Yes/No).
- **Music**: Participation in music (Yes/No).
- **Volunteering**: Participation in volunteering activities (Yes/No).
- **GPA**: Grade Point Average of the student.
- **GradeClass**: Predicted class based on GPA (A, B, C, D, F).

## Data Validation

Data validation is essential to ensure the accuracy and reliability of the dataset. The following validation checks were performed:

1. **Missing Values**: Identified and addressed missing values in the dataset.
   ```python
   # Check for missing values
   missing_values = dataset.isnull().sum()
   ```

2. **Data Types**: Verified that each column has the correct data type (e.g., numerical, categorical).
   ```python
   # Check data types
   data_types = dataset.dtypes
   ```

3. **Unique Values**: Checked for unique values in categorical columns to ensure data consistency.
   ```python
   # Check unique values in categorical columns
   unique_values = dataset['Gender'].unique()
   ```

4. **Statistical Summary**: Generated a statistical summary of numerical features to understand their distribution.
   ```python
   # Statistical summary
   statistical_summary = dataset.describe()
   ```

## Exploratory Data Analysis (EDA)

EDA was performed to gain insights into the dataset and visualize relationships between variables. Key steps included:

1. **Visualizing Distributions**: Created histograms and box plots to visualize the distribution of numerical features (e.g., GPA, study time).
   ```python
   import seaborn as sns
   import matplotlib.pyplot as plt

   sns.histplot(dataset['GPA'], bins=10, kde=True)
   plt.title('Distribution of GPA')
   plt.show()
   ```

2. **Correlation Analysis**: Analyzed the correlation between features and the target variable (GPA) using heatmaps.
   ```python
   correlation_matrix = dataset.corr()
   sns.heatmap(correlation_matrix, annot=True)
   plt.title('Correlation Matrix')
   plt.show()
   ```

3. **Categorical Variable Analysis**: Explored relationships between categorical variables and GPA through bar charts.
   ```python
   sns.barplot(x='ParentalSupport', y='GPA', data=dataset)
   plt.title('GPA by Parental Support')
   plt.show()
   ```

## Data Preprocessing

Data preprocessing is crucial for preparing the dataset for modeling. Steps included:

1. **Encoding Categorical Variables**: Converted categorical variables into numerical format using one-hot encoding or label encoding.
   ```python
   # One-hot encoding for categorical variables
   dataset = pd.get_dummies(dataset, columns=['Gender', 'Ethnicity', 'ParentalEducation'], drop_first=True)
   ```

2. **Handling Missing Values**: Imputed missing values using appropriate methods (e.g., mean, median, mode).
   ```python
   # Fill missing values with mean for numerical columns
   dataset['StudyTimeWeekly'].fillna(dataset['StudyTimeWeekly'].mean(), inplace=True)
   ```

3. **Feature Scaling**: Normalized or standardized numerical features to bring them to a similar scale.
   ```python
   from sklearn.preprocessing import StandardScaler

   scaler = StandardScaler()
   dataset['GPA'] = scaler.fit_transform(dataset[['GPA']])
   ```

4. **Creating Target Variable**: Converted GPA to categorical grades (A, B, C, D, F) based on specified criteria.
   ```python
   def categorize_gpa(gpa):
       if gpa >= 3.5:
           return 'A'
       elif gpa >= 3.0:
           return 'B'
       elif gpa >= 2.5:
           return 'C'
       elif gpa >= 2.0:
           return 'D'
       else:
           return 'F'

   dataset['GradeClass'] = dataset['GPA'].apply(categorize_gpa)
   ```

## Predictive Modeling

The following steps were taken to build and evaluate predictive models:

1. **Splitting the Dataset**: Divided the dataset into training and testing sets.
   ```python
   from sklearn.model_selection import train_test_split

   X = dataset.drop(['GPA', 'GradeClass', 'StudentID'], axis=1)
   y = dataset['GradeClass']
   X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
   ```

2. **Choosing Algorithms**: Selected suitable algorithms for classification (e.g., Logistic Regression, Random Forest, Decision Tree).
   ```python
   from sklearn.ensemble import RandomForestClassifier

   model = RandomForestClassifier(n_estimators=100, random_state=42)
   model.fit(X_train, y_train)
   ```

3. **Model Predictions**: Made predictions on the test dataset.
   ```python
   y_pred = model.predict(X_test)
   ```

## Model Evaluation

Model performance was evaluated using metrics such as accuracy, confusion matrix, and classification report.

1. **Accuracy**: Calculated the accuracy of the model.
   ```python
   from sklearn.metrics import accuracy_score

   accuracy = accuracy_score(y_test, y_pred)
   print(f'Accuracy: {accuracy:.2f}')
   ```

2. **Confusion Matrix**: Visualized the confusion matrix to understand model performance.
   ```python
   from sklearn.metrics import confusion_matrix
   import seaborn as sns

   cm = confusion_matrix(y_test, y_pred)
   sns.heatmap(cm, annot=True, fmt='d')
   plt.title('Confusion Matrix')
   plt.xlabel('Predicted')
   plt.ylabel('Actual')
   plt.show()
   ```

3. **Classification Report**: Generated a classification report for precision, recall, and F1 score.
   ```python
   from sklearn.metrics import classification_report

   report = classification_report(y_test, y_pred)
   print(report)
   ```

## Conclusion

This project successfully analyzed and predicted student performance based on various factors. The predictive model developed can assist educators in identifying students who may need additional support and resources to enhance their academic success.

## Future Work

Future enhancements may include:
- Exploring additional features that could influence student performance.
- Implementing advanced machine learning techniques such as neural networks.
- Conducting a more detailed analysis of the impact of specific variables on student performance.
- Integrating this model into an application for real-time predictions.

## References
1. [Kaggle Dataset](https://www.kaggle.com/datasets/rabieelkharoua/students-performance-dataset)
2. [Wiley Online Library](https://onlinelibrary.wiley.com/doi/10.1155/2024/4067721)
3. [KTH Diva Portal](https://kth.diva-portal.org/smash/get/diva2:1795896/FULLTEXT01.pdf)
4. [IRJMETS](https://www.irjmets.com/uploadedfiles/paper/issue_6_june_2023/42322/final/fin_irjmets1687680310.pdf)

---
