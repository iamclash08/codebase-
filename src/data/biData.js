const biData = [
  {
    id: 1,
    title: "BI Practical 1 - Power BI Dashboard",
    type: "file",
    file: "/files/bi/practical1.pbix"
  },

  {
    id: 2,
    title: "BI Practical 2 - Power BI Report",
    type: "file",
    file: "/files/bi/practical2.pbix"
  },

  {
    id: 3,
    title: "BI Practical 3 - Data Visualization",
    type: "file",
    file: "/files/bi/practical3.pbix"
  },

  {
    id: 4,
    title: "BI Practical 4 - Interactive Dashboard",
    type: "file",
    file: "/files/bi/practical4.pbix"
  },

  {
    id: 5,
    title: "BI Practical 5 - Python Data Analysis",
    type: "code",
    code: `
*
# Import required libraries

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, accuracy_score, classification_report
from matplotlib.colors import ListedColormap

*
# Load dataset

df = pd.read_csv('User_Data.csv')
print(df.head())

*
# Explore dataset

print(df.info())
print(df.isnull().sum())


*
# Convert categorical data to numerical

le = LabelEncoder()

for col in df.columns:
    if df[col].dtype == 'object':
        df[col] = le.fit_transform(df[col])

print(df.head())


*
# Split dataset into features and target

X = df.iloc[:, :-1]
y = df.iloc[:, -1]



*
# Split into training and testing data

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=0
)

print("Training Set:", X_train.shape)
print("Testing Set:", X_test.shape)


*
# Apply feature scaling

sc = StandardScaler()

X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)



*
# Train Random Forest model

model = RandomForestClassifier(n_estimators=100, random_state=0)
model.fit(X_train, y_train)



*
# Predict and evaluate model

y_pred = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))


*
# Display confusion matrix as colored heatmap

cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(5,4))
sns.heatmap(cm, annot=True, fmt='d', cmap='coolwarm')
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix")
plt.show()


*
# Prepare training data for visualization (only first 2 features)

X_vis = X_train[:, :2]
y_vis = y_train.values

model_vis = RandomForestClassifier(n_estimators=100, random_state=0)
model_vis.fit(X_vis, y_vis)



*
# Create mesh grid for decision boundary

x1_min, x1_max = X_vis[:, 0].min() - 1, X_vis[:, 0].max() + 1
x2_min, x2_max = X_vis[:, 1].min() - 1, X_vis[:, 1].max() + 1

xx, yy = np.meshgrid(
    np.arange(x1_min, x1_max, 0.02),
    np.arange(x2_min, x2_max, 0.02)
)

Z = model_vis.predict(np.array([xx.ravel(), yy.ravel()]).T)
Z = Z.reshape(xx.shape)



*
# Plot Random Forest graph for training set

plt.figure(figsize=(8,6))

plt.contourf(xx, yy, Z, alpha=0.5, cmap=ListedColormap(('purple','green')))

for i, j in enumerate(np.unique(y_vis)):
    plt.scatter(X_vis[y_vis == j, 0], X_vis[y_vis == j, 1], label=j)

plt.title("Random Forest Algorithm (Training set)")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")
plt.legend()
plt.show()



*
# Plot Random Forest graph for test set

X_test_vis = X_test[:, :2]
y_test_vis = y_test.values

plt.figure(figsize=(8,6))

plt.contourf(xx, yy, Z, alpha=0.5, cmap=ListedColormap(('purple','green')))

for i, j in enumerate(np.unique(y_test_vis)):
    plt.scatter(X_test_vis[y_test_vis == j, 0], X_test_vis[y_test_vis == j, 1], label=j)

plt.title("Random Forest Algorithm (Test set)")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")
plt.legend()
plt.show()





`
  },

  {
    id: 6,
    title: "BI Practical 6 ",
    type: "code",
    code: `
*
# Import required libraries

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, accuracy_score

*
# Load dataset

df = pd.read_csv('weather_data.csv')
print(df.head())

*
# Convert categorical data to numerical

le = LabelEncoder()

df['Outlook'] = le.fit_transform(df['Outlook'])
df['Temperature'] = le.fit_transform(df['Temperature'])
df['Humidity'] = le.fit_transform(df['Humidity'])
df['Wind'] = le.fit_transform(df['Wind'])
df['Play'] = le.fit_transform(df['Play'])

print(df.head())


*
# Split dataset into training and testing

X = df.drop('Play', axis=1)
y = df['Play']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


*
# Train decision tree model

model = DecisionTreeClassifier(criterion='entropy', max_depth=3)
model.fit(X_train, y_train)


*
# Evaluate model performance

y_pred = model.predict(X_test)

print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("Accuracy:", accuracy_score(y_test, y_pred))


*
# Visualize decision tree with better spacing and readability

plt.figure(figsize=(20,12))   # Increase size for more space

plot_tree(
    model,
    feature_names=X.columns,
    class_names=['No','Yes'],
    filled=True,
    rounded=True,        # Rounded boxes
    fontsize=10          # Smaller font for clarity
)

plt.title("Decision Tree Visualization", fontsize=16)
plt.show()



*
# Plot proper scatter graph for visualization

plt.figure(figsize=(8,6))

plt.scatter(df['Outlook'], df['Humidity'], c=y, s=100)

plt.xlabel("Outlook")
plt.ylabel("Humidity")
plt.title("Weather Data Visualization using Decision Tree")

plt.grid(True)

plt.show()





`
  }
];

export default biData;