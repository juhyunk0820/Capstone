import pandas as pd
import heapq

# Load the CSV file
file_path = 'from_to_cost(수정본csv,시청추가).csv'
data = pd.read_csv(file_path)

# Creating the graph as a dictionary of dictionaries
graph = {}
name_to_id = {}  # Map to store node name to node ID

for index, row in data.iterrows():
    if row['from'] not in graph:
        graph[row['from']] = {}
    graph[row['from']][row['to']] = (row['cost'], row['CONZONE_ID'])
    name_to_id[row['ST_ND_NM']] = row['from']
    name_to_id[row['END_ND_NM']] = row['to']


def heuristic(node, goal):
    # Simplistic heuristic (straight-line distance, cost estimate, etc.)
    return 0


def a_star_algorithm(graph, start, goal):
    # Priority queue to store the nodes to explore
    open_heap = []
    heapq.heappush(open_heap, (0, start, []))  # (priority, current node, path taken)

    # This stores the lowest cost to reach each node visited
    costs = {}
    costs[start] = 0

    while open_heap:
        # Fetch the node with the lowest cost so far
        cost_so_far, current, path = heapq.heappop(open_heap)

        # If the goal is reached, return the path and cost
        if current == goal:
            return path + [current], cost_so_far

        # Explore each neighbor of the current node
        for neighbor in graph.get(current, {}):
            new_cost = cost_so_far + graph[current][neighbor][0]
            if neighbor not in costs or new_cost < costs[neighbor]:
                costs[neighbor] = new_cost
                priority = new_cost + heuristic(neighbor, goal)
                heapq.heappush(open_heap, (priority, neighbor, path + [current]))

    return None, float('inf')  # In case no path is found


# Function to translate node names to IDs and find path
def find_path_by_names(start_name, goal_name):
    start_id = name_to_id.get(start_name)
    goal_id = name_to_id.get(goal_name)
    if start_id is None or goal_id is None:
        return "One of the node names is incorrect."
    path, total_cost = a_star_algorithm(graph, start_id, goal_id)
    return path, total_cost


# Example usage with start and goal node names
start_name = '울산광역시청'
goal_name = '부산광역시청'
path, total_cost = find_path_by_names(start_name, goal_name)
print("Path IDs:", path)
print("Total Cost:", total_cost)