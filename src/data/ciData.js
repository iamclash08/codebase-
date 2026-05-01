const ciData = [
  {
    id: 1,
    title: "CI Practical 1 ",
    code: `
*
  Aim : Design a distributed application using RPC for remote computation where client submits an integer value to the server and server calculates factorial and returns the result to the client program.
Input :--
Server code : 
from xmlrpc.server import SimpleXMLRPCServer
import math

# The function that will be executed remotely
def calculate_factorial(n):
    print(f"Received request from client to calculate factorial for: {n}")
    if n < 0:
        return "Error: Factorial of a negative number is undefined."
    return math.factorial(n)

# Set up the server on localhost, port 8000
server = SimpleXMLRPCServer(("localhost", 8000))
print("RPC Server is listening on port 8000...")

# Register the function so clients can call it
server.register_function(calculate_factorial, "calculate_factorial")

# Keep the server running
server.serve_forever()
Client code :-- 

import xmlrpc.client

# Connect to the RPC server
proxy = xmlrpc.client.ServerProxy("http://localhost:8000/")

try:
    num = int(input("Enter an integer to calculate its factorial: "))
    
    # Call the remote procedure just like a local function
    result = proxy.calculate_factorial(num)
    
    print(f"The factorial of {num} is: {result}")
except Exception as e:
    print(f"Connection failed or error occurred: {e}")


`
  },

  {
    id: 2,
    title: "CI Practical 2 ",
    code: `
*
Aim : Design a distributed application using RMI for remote computation where client submits two strings to the server and server returns the concatenation of the given strings.
Input : 

Server code : 
import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.Naming;

public class Server extends UnicastRemoteObject implements StringConcat {

    // Constructor required by UnicastRemoteObject
    protected Server() throws RemoteException {
        super();
    }

    // The actual remote computation logic
    @Override
    public String concatStrings(String str1, String str2) throws RemoteException {
        System.out.println("Client requested concatenation for: '" + str1 + "' and '" + str2 + "'");
        return str1 + str2;
    }

    public static void main(String[] args) {
        try {
            // Start the RMI registry on the default port 1099
            LocateRegistry.createRegistry(1099);
            
            // Create an instance of the server
            Server server = new Server();
            
            // Bind the server instance to the registry with a unique name
            Naming.rebind("rmi://localhost/StringConcatService", server);
            
            System.out.println("RMI Server is ready and waiting for requests...");
        } catch (Exception e) {
            System.err.println("Server exception: " + e.toString());
            e.printStackTrace();
        }
    }
}



Client Code :
import java.rmi.Naming;
import java.util.Scanner;

public class Client {
    public static void main(String[] args) {
        try {
            // Look up the remote object from the registry
            StringConcat stub = (StringConcat) Naming.lookup("rmi://localhost/StringConcatService");
            
            Scanner scanner = new Scanner(System.in);
            
            // Get user input
            System.out.print("Enter the first string: ");
            String string1 = scanner.nextLine();
            
            System.out.print("Enter the second string: ");
            String string2 = scanner.nextLine();
            
            // Invoke the remote method
            String result = stub.concatStrings(string1, string2);
            
            System.out.println("Result from server: " + result);
            
            scanner.close();
        } catch (Exception e) {
            System.err.println("Client exception: " + e.toString());
            e.printStackTrace();
        }
    }
}



String Concatenation Code :  
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface StringConcat extends Remote {
    // Method signature for concatenating two strings
    String concatStrings(String str1, String str2) throws RemoteException;
}


`
  },

  {
    id: 3,
    title: "CI Practical 3 ",
    code: `
*
import numpy as np
# Function to perform Union operation on fuzzy sets
def fuzzy_union(A, B):
    return np.maximum(A, B)

*
# Function to perform Intersection operation on fuzzy sets
def fuzzy_intersection(A, B):
    return np.minimum(A, B)

*
# Function to perform Complement operation on a fuzzy set
def fuzzy_complement(A):
    return 1 - A

*
# Function to perform Difference operation on fuzzy sets
def fuzzy_difference(A, B):
    return np.maximum(A, 1 - B)

*
# Function to create fuzzy relation by Cartesian product of two fuzzy sets
def cartesian_product(A, B):
    return np.outer(A, B)

*
# Function to perform Max-Min composition on two fuzzy relations
def max_min_composition(R, S):
    return np.max(np.minimum.outer(R, S), axis=1)

*
# Example usage
A = np.array([0.2, 0.4, 0.6, 0.8])  # Fuzzy set A
B = np.array([0.3, 0.5, 0.7, 0.9])  # Fuzzy set B

*
# Operations on fuzzy sets
union_result = fuzzy_union(A, B)
intersection_result = fuzzy_intersection(A, B)
complement_A = fuzzy_complement(A)
difference_result = fuzzy_difference(A, B)


*
print("Union:", union_result)
print("Intersection:", intersection_result)
print("Complement of A:", complement_A)
print("Difference:", difference_result)

*
# Fuzzy relations
R = np.array([0.2, 0.5, 0.4])  # Fuzzy relation R
S = np.array([0.6, 0.3, 0.7])  # Fuzzy relation S

*
# Cartesian product of fuzzy relations
cartesian_result = cartesian_product(R, S)

*
# Max-Min composition of fuzzy relations
composition_result = max_min_composition(R, S)

*
print("Cartesian product of R and S:")
print(cartesian_result)

*
print("Max-Min composition of R and S:")
print(composition_result)


`
  },

  {
    id: 4,
    title: "CI Practical 4 ",
    code: `
*
import random
import time

# ==========================================
# 1. Define the Server Model
# ==========================================
class Server:
    def __init__(self, server_id):
        self.server_id = server_id
        self.active_connections = 0

    def add_connection(self):
        self.active_connections += 1

    def release_connection(self):
        if self.active_connections > 0:
            self.active_connections -= 1

    def __str__(self):
        return f"Server-{self.server_id} (Active: {self.active_connections})"

*
# ==========================================
# 2. Define the Load Balancing Algorithms
# ==========================================
class RoundRobinLB:
    def __init__(self, servers):
        self.servers = servers
        self.current_index = 0

    def get_next_server(self):
        # Pick the server at the current index
        server = self.servers[self.current_index]
        # Move to the next index, looping back to 0 if at the end
        self.current_index = (self.current_index + 1) % len(self.servers)
        return server

class LeastConnectionsLB:
    def __init__(self, servers):
        self.servers = servers

    def get_next_server(self):
        # Find the server with the absolute minimum active connections
        # If there's a tie, min() returns the first one it encounters
        least_loaded_server = min(self.servers, key=lambda s: s.active_connections)
        return least_loaded_server

*
# ==========================================
# 3. The Simulation Function
# ==========================================
def run_simulation(lb_strategy, servers, num_requests=10):
    print(f"\n--- Starting Simulation: {lb_strategy.__class__.__name__} ---")
    
    for i in range(1, num_requests + 1):
        print(f"\n[Request {i} Arrives]")
        
        # 1. Randomly simulate some previous connections finishing
        for server in servers:
            if server.active_connections > 0 and random.choice([True, False]):
                server.release_connection()
                print(f"  * A previous task finished on {server.server_id}")

        # 2. Use the Load Balancer to find the best server for the new request
        assigned_server = lb_strategy.get_next_server()
        assigned_server.add_connection()
        print(f"  -> Routed to: {assigned_server.server_id}")
        
        # 3. Print the current state of all servers
        state = " | ".join([str(s) for s in servers])
        print(f"  Current Load: [ {state} ]")
        
        # Pause slightly to simulate real-time processing (optional)
        time.sleep(0.5)

*
# ==========================================
# 4. Execute the Practical
# ==========================================
if __name__ == "__main__":
    # Initialize 3 servers for the experiment
    server_list_1 = [Server("A"), Server("B"), Server("C")]
    server_list_2 = [Server("X"), Server("Y"), Server("Z")]

    # Initialize the load balancers
    rr_balancer = RoundRobinLB(server_list_1)
    lc_balancer = LeastConnectionsLB(server_list_2)

    # Run the Round Robin Simulation
    run_simulation(rr_balancer, server_list_1, num_requests=8)

    # Run the Least Connections Simulation
    run_simulation(lc_balancer, server_list_2, num_requests=8)




`
  },

  {
    id: 5,
    title: "CI Practical 5 ",
    code: `
*
import random

*
!pip install deap

*
from deap import base, creator, tools, algorithms

*
# Define evaluation function (this is a mock function, replace this with your actual evaluation function)
def evaluate(individual):
    # Here 'individual' represents the parameters for the neural network
    # You'll need to replace this with your actual evaluation function that trains the neural network and evaluates its performance
    # Return a fitness value (here, a random number is used as an example)
    return random.random(),

*
# Define genetic algorithm parameters
POPULATION_SIZE = 10
GENERATIONS = 5

*
# Create types for fitness and individuals in the genetic algorithm
creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
creator.create("Individual", list, fitness=creator.FitnessMin)

*
# Initialize toolbox
toolbox = base.Toolbox()

*
# Define attributes and individuals
toolbox.register("attr_neurons", random.randint, 1, 100)  # Example: number of neurons
toolbox.register("attr_layers", random.randint, 1, 5)  # Example: number of layers
toolbox.register("individual", tools.initCycle, creator.Individual, (toolbox.attr_neurons, toolbox.attr_layers), n=1)
toolbox.register("population", tools.initRepeat, list, toolbox.individual)

*
# Genetic operators
toolbox.register("evaluate", evaluate)
toolbox.register("mate", tools.cxTwoPoint)
toolbox.register("mutate", tools.mutUniformInt, low=1, up=100, indpb=0.2)
toolbox.register("select", tools.selTournament, tournsize=3)

*
# Create initial population
population = toolbox.population(n=POPULATION_SIZE)

*
# Run the genetic algorithm
for gen in range(GENERATIONS):
    offspring = algorithms.varAnd(population, toolbox, cxpb=0.5, mutpb=0.1)
    
    fitnesses = toolbox.map(toolbox.evaluate, offspring)
    for ind, fit in zip(offspring, fitnesses):
        ind.fitness.values = fit
    
    population = toolbox.select(offspring, k=len(population))

*
# Get the best individual from the final population
best_individual = tools.selBest(population, k=1)[0]
best_params = best_individual

*
# Print the best parameters found
print("Best Parameters:", best_params)

`
  },

  {
    id: 6,
    title: "CI Practical 6 ",
    code: `
*
import numpy as np

*
class CLONALG:
    def __init__(self, pop_size=20, bounds=[-5.0, 5.0], generations=50, clone_multiplier=5, mutation_rate=0.2):
        self.pop_size = pop_size
        self.bounds = bounds
        self.generations = generations
        self.clone_multiplier = clone_multiplier
        self.mutation_rate = mutation_rate
        self.num_variables = 2 # (x, y) coordinates
        
    # --- CORE PRINCIPLES ---
    
    def affinity_function(self, antibody):
        """
        Evaluates the fitness of a candidate solution.
        Aim: Maximize the function f(x, y) = -(x^2 + y^2) + 100.
        The maximum affinity is 100, which occurs precisely at x=0, y=0.
        """
        x, y = antibody
        return -(x**2 + y**2) + 100

    def calculate_population_affinity(self, population):
        """Helper function to evaluate an entire population."""
        return np.array([self.affinity_function(ind) for ind in population])

    # --- CLONALG PHASES ---

    def optimize(self):
        # 1. Initialization: Generate a random population of antibodies
        population = np.random.uniform(
            self.bounds[0], self.bounds[1], 
            (self.pop_size, self.num_variables)
        )
        
        print("Starting CLONALG Optimization...\n")

        for gen in range(self.generations):
            # 2. Evaluation
            affinities = self.calculate_population_affinity(population)

            # 3. Selection (Sort descending to find high-affinity antibodies)
            sorted_indices = np.argsort(affinities)[::-1]
            population = population[sorted_indices]
            affinities = affinities[sorted_indices]

            # 4. Cloning: Create clones proportional to affinity rank
            clones = []
            for i in range(self.pop_size):
                # Higher affinity (lower index i) gets more clones
                num_clones = int((self.clone_multiplier * self.pop_size) / (i + 1))
                for _ in range(num_clones):
                    clones.append(population[i].copy())
            clones = np.array(clones)

            # 5. Hypermutation: Introduce random mutations to clones
            for i in range(len(clones)):
                if np.random.rand() < self.mutation_rate:
                    # Apply a random shift to the coordinates
                    mutation_step = np.random.normal(0, 0.5, self.num_variables)
                    clones[i] += mutation_step
                    # Keep the mutated clones within our defined search bounds
                    clones[i] = np.clip(clones[i], self.bounds[0], self.bounds[1])

            # 6. Evaluation (of mutated clones)
            clone_affinities = self.calculate_population_affinity(clones)

            # 7. Selection and Replacement
            # Combine original population and mutated clones
            combined_population = np.vstack((population, clones))
            combined_affinities = np.concatenate((affinities, clone_affinities))

            # Select the absolute best to form the next generation (elitism)
            best_indices = np.argsort(combined_affinities)[::-1][:self.pop_size]
            population = combined_population[best_indices]
            best_affinity = combined_affinities[best_indices[0]]

            # Print progress every 10 generations
            if (gen + 1) % 10 == 0:
                print(f"Generation {gen + 1:2d} | Best Affinity: {best_affinity:.4f} | Best Antibody: {population[0]}")

        # 8. Termination
        print("\nOptimization Complete.")
        best_antibody = population[0]
        final_affinity = self.calculate_population_affinity([best_antibody])[0]
        return best_antibody, final_affinity



*
# ==========================================
# Execution
# ==========================================
if __name__ == "__main__":
    # Initialize and run the algorithm
    immune_system = CLONALG(pop_size=20, generations=50)
    best_solution, best_fitness = immune_system.optimize()
    
    print("\n--- Final Results ---")
    print(f"Ideal Target     : x=0.0, y=0.0 (Affinity: 100.0)")
    print(f"Algorithm Found  : x={best_solution[0]:.4f}, y={best_solution[1]:.4f} (Affinity: {best_fitness:.4f})")

*


`
  },

  {
    id: 7,
    title: "CI Practical 7 ",
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

export default ciData;