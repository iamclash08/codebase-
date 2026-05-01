const dcData = [
  {
    id: 8,
    title: "DC Practical 8 - Process Scheduling",
    code: `
*
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler

# ==========================================
# Steps 1, 2 & 3: Understanding, Preprocessing, and Representation
# ==========================================
def load_and_preprocess_data():
    print("Loading and Preprocessing Data (Step 2)...")
    url = "https://archive.ics.uci.edu/ml/machine-learning-databases/00601/ai4i2020.csv"
    df = pd.read_csv(url)
    y = df['Machine failure'].values # Target labels
    X = df.drop(columns=['UDI', 'Product ID', 'Type', 'Machine failure', 'TWF', 'HDF', 'PWF', 'OSF', 'RNF']).values
    
    # Normalization (Crucial for distance/affinity calculations)
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    return X_scaled, y


*

# ==========================================
# The Complete AIPR Class
# ==========================================
class EvolvedAIPR:
    def __init__(self, num_antibodies=200, clone_rate=5, mutation_rate=0.1, epochs=3):
        self.num_antibodies = num_antibodies
        self.clone_rate = clone_rate
        self.mutation_rate = mutation_rate
        self.epochs = epochs
        self.antibodies = []
        self.labels = []

    def train(self, X, y):
        # Step 4: Generation of Antibodies
        print("Initializing Antibodies (Step 4)...")
        initial_indices = np.random.choice(len(X), self.num_antibodies, replace=False)
        self.antibodies = X[initial_indices].copy()
        self.labels = y[initial_indices].copy()

        print("Starting Affinity Maturation and Training (Steps 5 & 6)...")
        # Step 6: Training Loop
        for epoch in range(self.epochs):
            for i, antigen in enumerate(X):
                antigen_label = y[i]
                
                # Only compare with antibodies designed for this specific class
                mask = (self.labels == antigen_label)
                if not np.any(mask): continue
                
                valid_antibodies = self.antibodies[mask]
                valid_indices = np.where(mask)[0]
                
                # Calculate Affinity (Euclidean Distance - lower is better)
                distances = np.linalg.norm(valid_antibodies - antigen, axis=1)
                best_match_idx = valid_indices[np.argmin(distances)]
                best_antibody = self.antibodies[best_match_idx]
                
                # Step 5: Affinity Maturation (Cloning and Mutation)
                # 1. Clone the best antibody
                clones = np.tile(best_antibody, (self.clone_rate, 1))
                
                # 2. Mutate the clones slightly
                noise = np.random.randn(*clones.shape) * self.mutation_rate
                mutated_clones = clones + noise
                
                # 3. Selection: Did any mutation improve the affinity?
                clone_distances = np.linalg.norm(mutated_clones - antigen, axis=1)
                best_clone_idx = np.argmin(clone_distances)
                
                # If a mutated clone is a better match than the original antibody, replace it
                if clone_distances[best_clone_idx] < np.min(distances):
                    self.antibodies[best_match_idx] = mutated_clones[best_clone_idx]
                    
    def predict(self, X):
        # Step 7: Classification
        print("Classifying test instances (Step 7)...")
        predictions = []
        for antigen in X:
            # Find the closest antibody in our evolved pool
            distances = np.linalg.norm(self.antibodies - antigen, axis=1)
            best_match_idx = np.argmin(distances)
            predictions.append(self.labels[best_match_idx])
        return np.array(predictions)


*

# ==========================================
# Execution and Step 8: Evaluation
# ==========================================
if __name__ == "__main__":
    X, y = load_and_preprocess_data()
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Initialize the evolved system
    aipr = EvolvedAIPR(num_antibodies=300, clone_rate=5, mutation_rate=0.05, epochs=2)
    
    # Train it (This will take slightly longer now due to the evolutionary loop)
    aipr.train(X_train, y_train)

    # Predict
    predictions = aipr.predict(X_test)
    
    # Step 8: Evaluation
    print("\n--- AIPR EVALUATION (Step 8) ---")
    accuracy = accuracy_score(y_test, predictions)
    print(f"Overall Accuracy: {accuracy * 100:.2f}%\n")
    print(classification_report(y_test, predictions, target_names=["Intact (0)", "Damaged (1)"]))

    

`
  },

  {
    id: 9,
    title: "DC Practical 9 - Deadlock",
    code: `

*
import random
from deap import base, creator, tools, algorithms


*
# Define the evaluation function (minimize a simple mathematical function)
def eval_func(individual):
    # Example evaluation function (minimize a quadratic function)
    return sum(x ** 2 for x in individual),


*
# DEAP setup
creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
creator.create("Individual", list, fitness=creator.FitnessMin)


*
toolbox = base.Toolbox()


*
# Define attributes and individuals
toolbox.register("attr_float", random.uniform, -5.0, 5.0)  # Example: Float values between -5 and 5
toolbox.register("individual", tools.initRepeat, creator.Individual, toolbox.attr_float, n=3)  # Example: 3-dimensional individual
toolbox.register("population", tools.initRepeat, list, toolbox.individual)



*
# Evaluation function and genetic operators
toolbox.register("evaluate", eval_func)
toolbox.register("mate", tools.cxBlend, alpha=0.5)
toolbox.register("mutate", tools.mutGaussian, mu=0, sigma=1, indpb=0.2)
toolbox.register("select", tools.selTournament, tournsize=3)


*
# Create population
population = toolbox.population(n=50)



*
# Genetic Algorithm parameters
generations = 20



*
# Run the algorithm
for gen in range(generations):
    offspring = algorithms.varAnd(population, toolbox, cxpb=0.5, mutpb=0.1)
    
    fits = toolbox.map(toolbox.evaluate, offspring)
    for fit, ind in zip(fits, offspring):
        ind.fitness.values = fit
    
    population = toolbox.select(offspring, k=len(population))



*
# Get the best individual after generations
best_ind = tools.selBest(population, k=1)[0]
best_fitness = best_ind.fitness.values[0]
 
print("Best individual:", best_ind)
print("Best fitness:", best_fitness)





    `
  },

  {
    id: 10,
    title: "DC Practical 10 - CPU Scheduling with Data",
    file: "/data/weather.csv",   
    code: `
*
# We import required libraries
import pandas as pd


*
# Load the dataset (weather.csv)
data = pd.read_csv("weather.csv", header=None)

# Assign column names
data.columns = ["Year", "Month", "Day", "Temperature"]

# Display first few rows
print(data.head())




*
# Mapper: Extract (Year, Temperature)

mapped = list(zip(data["Year"], data["Temperature"]))

print("Mapped Data (Year, Temperature):")
print(mapped[:5])




*
# Group data by Year (Shuffle & Sort)

grouped = {}

for year, temp in mapped:
    if year not in grouped:
        grouped[year] = []
    grouped[year].append(temp)

print("Grouped Data:")
print(grouped)



*
# Calculate average temperature per year

averages = {}

for year in grouped:
    avg_temp = sum(grouped[year]) / len(grouped[year])
    averages[year] = avg_temp

print("Year-wise Averages:")
for year in averages:
    print(year, ":", averages[year])
   



*
# Find hottest and coolest year

hottest_year = max(averages, key=averages.get)
coolest_year = min(averages, key=averages.get)

print("\nHottest Year:", hottest_year)
print("Coolest Year:", coolest_year)
    `
  },

  {
    id: 11,
    title: "DC Practical 11 - Memory Management",
    code: `
*
import numpy as np
import random



*
# Define the distance matrix (distances between cities)
# Replace this with your distance matrix or generate one based on your problem
# Example distance matrix (replace this with your actual data)
distance_matrix = np.array([
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
])


*
# Parameters for Ant Colony Optimization
num_ants = 10
num_iterations = 50
evaporation_rate = 0.5
pheromone_constant = 1.0
heuristic_constant = 1.0



*
# Initialize pheromone matrix and visibility matrix
num_cities = len(distance_matrix)
pheromone = np.ones((num_cities, num_cities))  # Pheromone matrix
visibility = 1 / distance_matrix  # Visibility matrix (inverse of distance)


*
# ACO algorithm
for iteration in range(num_iterations):
    ant_routes = []
    for ant in range(num_ants):
        current_city = random.randint(0, num_cities - 1)
        visited_cities = [current_city]
        route = [current_city]
        
        while len(visited_cities) < num_cities:
            probabilities = []
            for city in range(num_cities):
                if city not in visited_cities:
                    pheromone_value = pheromone[current_city][city]
                    visibility_value = visibility[current_city][city]
                    probability = (pheromone_value ** pheromone_constant) * (visibility_value ** heuristic_constant)
                    probabilities.append((city, probability))
            
            probabilities = sorted(probabilities, key=lambda x: x[1], reverse=True)
            selected_city = probabilities[0][0]
            route.append(selected_city)
            visited_cities.append(selected_city)
            current_city = selected_city
        
        ant_routes.append(route)
        
        # Update pheromone levels
    delta_pheromone = np.zeros((num_cities, num_cities))
    for ant, route in enumerate(ant_routes):
        for i in range(len(route) - 1):
            city_a = route[i]
            city_b = route[i + 1]
            delta_pheromone[city_a][city_b] += 1 / distance_matrix[city_a][city_b]
            delta_pheromone[city_b][city_a] += 1 / distance_matrix[city_a][city_b]
    
    pheromone = (1 - evaporation_rate) * pheromone + delta_pheromone


*
# Find the best route
best_route_index = np.argmax([sum(distance_matrix[cities[i]][cities[(i + 1) % num_cities]] for i in range(num_cities)) for cities in ant_routes])
best_route = ant_routes[best_route_index]
shortest_distance = sum(distance_matrix[best_route[i]][best_route[(i + 1) % num_cities]] for i in range(num_cities))


*
print("Best route:", best_route)
print("Shortest distance:", shortest_distance)
    
    `
  },

  {
    id: 12,
    title: "DC Practical 12 - Disk Scheduling",
    code: `

*
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.applications import vgg19

# ==========================================
# 1. Choose Content and S tyle Images
# ==========================================
def load_and_process_image(image_path, max_dim=512):
    img = tf.io.read_file(image_path)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)

    # Scale the image while keeping the aspect ratio
    shape = tf.cast(tf.shape(img)[:-1], tf.float32)
    long_dim = max(shape)
    scale = max_dim / long_dim
    new_shape = tf.cast(shape * scale, tf.int32)
    
    img = tf.image.resize(img, new_shape)
    img = img[tf.newaxis, :] # Add batch dimension
    return img

print("Downloading Sample Images...")
content_path = tf.keras.utils.get_file('YellowLabradorLooking_new.jpg', 'https://storage.googleapis.com/download.tensorflow.org/example_images/YellowLabradorLooking_new.jpg')
style_path = tf.keras.utils.get_file('kandinsky5.jpg','https://storage.googleapis.com/download.tensorflow.org/example_images/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg')

content_image = load_and_process_image(content_path)
style_image = load_and_process_image(style_path)



*
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.applications import vgg19

# ==========================================
# 1. Choose Content and Style Images
# ==========================================
def load_and_process_image(image_path, max_dim=512):
    img = tf.io.read_file(image_path)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)

    # Scale the image while keeping the aspect ratio
    shape = tf.cast(tf.shape(img)[:-1], tf.float32)
    long_dim = max(shape)
    scale = max_dim / long_dim
    new_shape = tf.cast(shape * scale, tf.int32)
    
    img = tf.image.resize(img, new_shape)
    img = img[tf.newaxis, :] # Add batch dimension
    return img

print("Downloading Sample Images...")
content_path = tf.keras.utils.get_file('YellowLabradorLooking_new.jpg', 'https://storage.googleapis.com/download.tensorflow.org/example_images/YellowLabradorLooking_new.jpg')
style_path = tf.keras.utils.get_file('kandinsky5.jpg','https://storage.googleapis.com/download.tensorflow.org/example_images/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg')

content_image = load_and_process_image(content_path)
style_image = load_and_process_image(style_path)




*
# ==========================================
# 2. Preprocess Images & Load VGG19
# ==========================================
# Define which layers of VGG19 represent "Style" and which represent "Content"
content_layers = ['block5_conv2'] 
style_layers = ['block1_conv1', 'block2_conv1', 'block3_conv1', 'block4_conv1', 'block5_conv1']

num_content_layers = len(content_layers)
num_style_layers = len(style_layers)

def get_vgg_model(style_layers, content_layers):
    # Load VGG19 trained on ImageNet, without the classification head
    vgg = tf.keras.applications.VGG19(include_top=False, weights='imagenet')
    vgg.trainable = False
    
    # Get the outputs of the specific layers we chose
    style_outputs = [vgg.get_layer(name).output for name in style_layers]
    content_outputs = [vgg.get_layer(name).output for name in content_layers]
    model_outputs = style_outputs + content_outputs
    
    return tf.keras.Model([vgg.input], model_outputs)

vgg_model = get_vgg_model(style_layers, content_layers)




*
# ==========================================
# 3. Define Loss Functions
# ==========================================
def gram_matrix(input_tensor):
    # This calculates the style/texture correlations
    result = tf.linalg.einsum('bijc,bijd->bcd', input_tensor, input_tensor)
    input_shape = tf.shape(input_tensor)
    num_locations = tf.cast(input_shape[1]*input_shape[2], tf.float32)
    return result / (num_locations)

class StyleContentModel(tf.keras.models.Model):
    def __init__(self, style_layers, content_layers):
        super(StyleContentModel, self).__init__()
        self.vgg = get_vgg_model(style_layers, content_layers)
        self.style_layers = style_layers
        self.content_layers = content_layers
        self.num_style_layers = len(style_layers)
        self.vgg.trainable = False

    def call(self, inputs):
        # Preprocess input explicitly for VGG19
        inputs = inputs * 255.0
        preprocessed_input = vgg19.preprocess_input(inputs)
        outputs = self.vgg(preprocessed_input)
        
        style_outputs, content_outputs = (outputs[:self.num_style_layers], outputs[self.num_style_layers:])
        style_outputs = [gram_matrix(style_output) for style_output in style_outputs]
        
        content_dict = {content_name: value for content_name, value in zip(self.content_layers, content_outputs)}
        style_dict = {style_name: value for style_name, value in zip(self.style_layers, style_outputs)}
        return {'content': content_dict, 'style': style_dict}

extractor = StyleContentModel(style_layers, content_layers)

# Extract targets (what we want our generated image to match)
style_targets = extractor(style_image)['style']
content_targets = extractor(content_image)['content']

# Initialize the generated image as the content image
generated_image = tf.Variable(content_image)




*
# ==========================================
# 4. Optimization
# ==========================================
# Weights to balance how much content vs. how much style you want
style_weight = 1e-2
content_weight = 1e4

optimizer = tf.optimizers.Adam(learning_rate=0.02, beta_1=0.99, epsilon=1e-1)

@tf.function() # Compiles this function into a fast TensorFlow graph
def train_step(image):
    with tf.GradientTape() as tape:
        outputs = extractor(image)
        
        # Calculate Style Loss
        style_loss = tf.add_n([tf.reduce_mean((outputs['style'][name] - style_targets[name])**2) 
                               for name in outputs['style'].keys()])
        style_loss *= style_weight / num_style_layers
        
        # Calculate Content Loss
        content_loss = tf.add_n([tf.reduce_mean((outputs['content'][name] - content_targets[name])**2) 
                                 for name in outputs['content'].keys()])
        content_loss *= content_weight / num_content_layers
        
        # Total Loss
        loss = style_loss + content_loss

    # Calculate gradients and update the image
    grad = tape.gradient(loss, image)
    optimizer.apply_gradients([(grad, image)])
    image.assign(tf.clip_by_value(image, clip_value_min=0.0, clip_value_max=1.0))



*
# ==========================================
# 5. Generate Artistic Image
# ==========================================
print("Starting Optimization Loop (This takes time on a CPU)...")

epochs = 5      # Increase this for a better final image (e.g., 10 or 20)
steps_per_epoch = 20 # How many gradient steps per epoch

for n in range(epochs):
    for m in range(steps_per_epoch):
        train_step(generated_image)
    print(f"Epoch {n+1}/{epochs} completed.")





*
# Display Results
plt.figure(figsize=(15, 5))
plt.subplot(1, 3, 1)
plt.title("Content Image")
plt.imshow(tf.squeeze(content_image))
plt.axis('off')

plt.subplot(1, 3, 2)
plt.title("Style Image")
plt.imshow(tf.squeeze(style_image))
plt.axis('off')

plt.subplot(1, 3, 3)
plt.title("Generated Artistic Image")
plt.imshow(tf.squeeze(generated_image.numpy()))
plt.axis('off')

plt.show()
print("Conclusion: Neural Style Transfer Successfully Implemented.")
    
    `
  }
];

export default dcData;