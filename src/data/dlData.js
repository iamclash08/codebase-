const dlData = [
  {
    title: "DL Code 1 - Sigmoid Function",
    file: "/data/USA_Housing.csv",
    code: `
*    
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

*
df = pd.read_csv('USA_Housing.csv')

*
print(df.head())
print(df.info())

*
df = df.dropna()


*
X = df[['Avg. Area Income',
        'Avg. Area House Age',
        'Avg. Area Number of Rooms',
        'Avg. Area Number of Bedrooms',
        'Area Population']]

y = df['Price']


*
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


*
model = LinearRegression()
model.fit(X_train, y_train)


*
y_pred = model.predict(X_test)



*
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Mean Squared Error:", mse)
print("R-squared:", r2)

`
  },
  {
    title: "DL Code 2 - Neural Network",
    code: `
*    
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from tensorflow import keras
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Dropout, Flatten, Dense
from tensorflow.keras.utils import to_categorical

from sklearn.metrics import confusion_matrix



*
(x_train, y_train), (x_test, y_test) = mnist.load_data()

print("Training data shape:", x_train.shape)
print("Testing data shape:", x_test.shape)




*
img_rows, img_cols = 28, 28

# Reshape data
x_train = x_train.reshape(x_train.shape[0], img_rows, img_cols, 1)
x_test = x_test.reshape(x_test.shape[0], img_rows, img_cols, 1)

# Convert to float and normalize
x_train = x_train.astype('float32') / 255
x_test = x_test.astype('float32') / 255

# One-hot encoding
y_train = to_categorical(y_train, 10)
y_test_cat = to_categorical(y_test, 10)





*
input_layer = Input(shape=(28, 28, 1))

layer1 = Conv2D(32, (3, 3), activation='relu')(input_layer)
layer2 = Conv2D(64, (3, 3), activation='relu')(layer1)
layer3 = MaxPooling2D(pool_size=(2, 2))(layer2)
layer4 = Dropout(0.5)(layer3)
layer5 = Flatten()(layer4)
layer6 = Dense(128, activation='relu')(layer5)
output_layer = Dense(10, activation='softmax')(layer6)

model = Model(inputs=input_layer, outputs=output_layer)

model.summary()



*
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)


*
history = model.fit(
    x_train, y_train,
    epochs=5,
    batch_size=128,
    validation_split=0.2
)



*
loss, accuracy = model.evaluate(x_test, y_test_cat)

print("Test Loss:", loss)
print("Test Accuracy:", accuracy)




*
y_pred = model.predict(x_test)
y_pred_classes = np.argmax(y_pred, axis=1)






*
cm = confusion_matrix(y_test, y_pred_classes)

plt.figure(figsize=(8,6))
sns.heatmap(cm, annot=True, fmt='d')
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix")
plt.show()


*
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend(['Train', 'Validation'])
plt.show()
    
    
    
    
    
    
    `
  },
  {
    title: "DL Code 3",
    code: `

*
import tensorflow as tf

from tensorflow.keras.datasets import imdb
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
from tensorflow.keras.preprocessing.sequence import pad_sequences



*
max_features = 10000   # Number of words
maxlen = 100           # Max sequence length
batch_size = 32


*
(x_train, y_train), (x_test, y_test) = imdb.load_data(num_words=max_features)

print("Training samples:", len(x_train))
print("Testing samples:", len(x_test))



*
x_train = pad_sequences(x_train, maxlen=maxlen)
x_test = pad_sequences(x_test, maxlen=maxlen)




*
model = Sequential()

model.add(Embedding(input_dim=max_features, output_dim=128))
model.add(LSTM(64, dropout=0.2, recurrent_dropout=0.2))
model.add(Dense(1, activation='sigmoid'))

model.summary()




*
model.compile(
    loss='binary_crossentropy',
    optimizer='adam',
    metrics=['accuracy']
)



*
model.fit(
    x_train,
    y_train,
    batch_size=batch_size,
    epochs=5,
    validation_data=(x_test, y_test)
)



*
score, acc = model.evaluate(x_test, y_test, batch_size=batch_size)

print("Test score:", score)
print("Test accuracy:", acc)


`
  },
  {
    title: "DL Code 4",
    code: `
*
import tensorflow as tf

from tensorflow.keras import datasets, layers, models
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator

from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt


*
(train_images, train_labels), (test_images, test_labels) = datasets.mnist.load_data()

train_images = train_images / 255.0
test_images = test_images / 255.0



*
train_images = train_images.reshape((60000, 28, 28, 1))
test_images = test_images.reshape((10000, 28, 28, 1))


*
train_images, val_images, train_labels, val_labels = train_test_split(
    train_images,
    train_labels,
    test_size=0.1,
    random_state=42
)


*
datagen = ImageDataGenerator(
    rotation_range=10,
    zoom_range=0.1,
    width_shift_range=0.1,
    height_shift_range=0.1
)

datagen.fit(train_images)




*
model = models.Sequential()

model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)))
model.add(layers.MaxPooling2D((2, 2)))

model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))

model.add(layers.Conv2D(128, (3, 3), activation='relu'))

model.add(layers.Flatten())
model.add(layers.Dropout(0.5))

model.add(layers.Dense(128, activation='relu'))
model.add(layers.Dense(10, activation='softmax'))

model.summary()



*
model.compile(
    optimizer=Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)



*
history = model.fit(
    datagen.flow(train_images, train_labels, batch_size=64),
    epochs=20,
    validation_data=(val_images, val_labels)
)



*
test_loss, test_acc = model.evaluate(test_images, test_labels)

print("Test Accuracy:", test_acc)



*
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')

plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.show()







    
    `
  },
  {
    title: "DL Code 5",
    code: `
*
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf

from keras.models import Sequential
from keras.layers import Dense, Flatten, Dropout, BatchNormalization, LeakyReLU, Reshape
from keras.datasets import fashion_mnist


*
(train_x, train_y), (val_x, val_y) = fashion_mnist.load_data()

# Normalize (0 to 1)
train_x = train_x / 255.0
val_x = val_x / 255.0

# Reshape
train_x = train_x.reshape(-1, 28, 28, 1)

print(train_x.shape)




*
fig, axe = plt.subplots(2, 2)

idx = 0
for i in range(2):
    for j in range(2):
        axe[i, j].imshow(train_x[idx].reshape(28, 28), cmap='gray')
        idx += 1

plt.show()




*
train_x = train_x * 2 - 1

print(train_x.max(), train_x.min())




*
generator = Sequential()

generator.add(Dense(512, input_shape=(100,)))
generator.add(LeakyReLU(alpha=0.2))
generator.add(BatchNormalization(momentum=0.8))

generator.add(Dense(256))
generator.add(LeakyReLU(alpha=0.2))
generator.add(BatchNormalization(momentum=0.8))

generator.add(Dense(128))
generator.add(LeakyReLU(alpha=0.2))
generator.add(BatchNormalization(momentum=0.8))

generator.add(Dense(784))
generator.add(Reshape((28, 28, 1)))

generator.summary()





*
discriminator = Sequential()

discriminator.add(Flatten(input_shape=(28, 28, 1)))
discriminator.add(Dense(256))
discriminator.add(LeakyReLU(alpha=0.2))
discriminator.add(Dropout(0.5))

discriminator.add(Dense(128))
discriminator.add(LeakyReLU(alpha=0.2))
discriminator.add(Dropout(0.5))

discriminator.add(Dense(64))
discriminator.add(LeakyReLU(alpha=0.2))
discriminator.add(Dropout(0.5))

discriminator.add(Dense(1, activation='sigmoid'))

discriminator.summary()





*
discriminator.compile(optimizer='adam', loss='binary_crossentropy')





*
discriminator.trainable = False

GAN = Sequential([generator, discriminator])

GAN.compile(optimizer='adam', loss='binary_crossentropy')

GAN.summary()





*
epochs = 30
batch_size = 100
noise_shape = 100





*
for epoch in range(epochs):
    print(f"Epoch {epoch+1}")

    for i in range(train_x.shape[0] // batch_size):

        noise = np.random.normal(0, 1, (batch_size, noise_shape))
        gen_images = generator.predict(noise, verbose=0)

        real_images = train_x[i * batch_size:(i + 1) * batch_size]

        # Train Discriminator
        discriminator.trainable = True

        real_labels = np.ones((batch_size, 1))
        fake_labels = np.zeros((batch_size, 1))

        d_loss_real = discriminator.train_on_batch(real_images, real_labels)
        d_loss_fake = discriminator.train_on_batch(gen_images, fake_labels)

        # Train Generator
        noise = np.random.normal(0, 1, (batch_size, noise_shape))
        discriminator.trainable = False

        g_loss = GAN.train_on_batch(noise, real_labels)

    # Show generated images every 10 epochs
    if epoch % 10 == 0:
        samples = 10
        noise = np.random.normal(0, 1, (samples, noise_shape))
        generated = generator.predict(noise, verbose=0)

        plt.figure(figsize=(10,4))
        for k in range(samples):
            plt.subplot(2, 5, k + 1)
            plt.imshow(generated[k].reshape(28, 28), cmap='gray')
            plt.axis('off')

        plt.show()


*
noise = np.random.normal(0, 1, (10, noise_shape))
gen_images = generator.predict(noise)

fig, axe = plt.subplots(2, 5)
fig.suptitle('Generated Images from GAN')

idx = 0
for i in range(2):
    for j in range(5):
        axe[i, j].imshow(gen_images[idx].reshape(28, 28), cmap='gray')
        axe[i, j].axis('off')
        idx += 1

plt.show()






    
    
    
    
    
    `
  },
  {
    title: "DL Code 6",
    code: `
    
*
import tensorflow as tf

from tensorflow.keras.datasets import imdb
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
from tensorflow.keras.preprocessing.sequence import pad_sequences



*
max_features = 10000   # Vocabulary size
maxlen = 100           # Sequence length
batch_size = 32



*
(x_train, y_train), (x_test, y_test) = imdb.load_data(num_words=max_features)

print("Train samples:", len(x_train))
print("Test samples:", len(x_test))




*
x_train = pad_sequences(x_train, maxlen=maxlen)
x_test = pad_sequences(x_test, maxlen=maxlen)




*
model = Sequential()

model.add(Embedding(input_dim=max_features, output_dim=128))
model.add(LSTM(64, dropout=0.2, recurrent_dropout=0.2))
model.add(Dense(1, activation='sigmoid'))

model.summary()



*
model.compile(
    loss='binary_crossentropy',
    optimizer='adam',
    metrics=['accuracy']
)




*
model.fit(
    x_train,
    y_train,
    batch_size=batch_size,
    epochs=5,
    validation_data=(x_test, y_test)
)




*
score, acc = model.evaluate(x_test, y_test, batch_size=batch_size)

print("Test score:", score)
print("Test accuracy:", acc)
    
    `
  }
];

export default dlData;