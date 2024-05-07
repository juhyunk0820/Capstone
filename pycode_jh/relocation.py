import pandas as pd
import numpy as np

# Load the dataset
updated_data = pd.read_csv('5m_dataset/tr_sumhmin/updated_data5(4.11).csv')
save_filepath = "5m_dataset/relocation/4.11relocation.csv"
# Calculate the weighted average speed for each node over time, taking into account traffic volume as weights
node_speed_data = updated_data.groupby(['ST_ND_ID', 'DateTime']).apply(
    lambda x: np.average(x['WEIGHTED_SPD_AVG'], weights=x['WEIGHTED_TRFFCVLM'])
).reset_index(name='Weighted_Avg_Spd')

# Rename the columns appropriately for clarity
node_speed_data.columns = ['Node_ID', 'DateTime', 'Weighted_Avg_Spd']

# Pivot the table to have Node_IDs as columns, DateTime as index, and Weighted_Avg_Spd as values
node_speed_pivoted = node_speed_data.pivot(index='DateTime', columns='Node_ID', values='Weighted_Avg_Spd')

# Save the pivoted table to a CSV file

node_speed_pivoted.to_csv(save_filepath)