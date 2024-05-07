import pandas as pd
import numpy as np

# Load the dataset
updated_data = pd.read_csv("5m_dataset/tr_sumhmin/updated_data5(3.21).csv")

# Calculate the weighted average speed for each node over time, taking into account traffic volume as weights
node_speed_data = updated_data.groupby(['ST_ND_ID', 'DateTime']).apply(
    lambda x: np.average(x['WEIGHTED_SPD_AVG'], weights=x['WEIGHTED_TRFFCVLM'])
).reset_index(name='Weighted_Avg_Spd')

# Rename the columns appropriately for clarity
node_speed_data.columns = ['Node_ID', 'DateTime', 'Weighted_Avg_Spd']

# Save the node_speed_data to a CSV file
node_speed_data.to_csv('node_speed_data_direct.csv', index=False)