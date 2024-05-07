# from datetime import datetime, timedelta
# import pandas as pd
#
# # Load your data
# data = pd.read_csv("5m_dataset/complete_complete/3.21(5m)_complete_complete.csv")
#
# # Date when the measurements start
# fixed_date = datetime(2024, 3, 21)
#
# # Function to convert minutes into datetime string
# def convert_to_datetime(minutes):
#     # Calculate total minutes correctly handling the minute overflow
#     hours, minutes = divmod(minutes, 60)
#     # Ensure hours are kept within the 0-23 range to avoid any date change
#     hours %= 24
#     # Construct the datetime object for the given hours and minutes
#     date_time = fixed_date.replace(hour=hours, minute=minutes, second=0)
#     return date_time.strftime('%Y-%m-%d %H:%M:%S')
#
# # Apply the function to the 'SUM_HMIN' column
# data['DateTime'] = data['SUM_HMIN'].apply(convert_to_datetime)
#
# # Remove the original 'SUM_HMIN' column
# data.drop('SUM_HMIN', axis=1, inplace=True)
#
# # Display the first few rows of the updated data to verify the conversion
# print(data.head())
#
# # Optionally, save the updated data back to a CSV
# data.to_csv('5m_dataset/tr_sumhmin/updated_data3(3.21).csv', index=False)

import pandas as pd

# Load the data from the CSV file
file_path = "5m_dataset/complete_complete/4.11(5m)_complete_complete.csv"
save_filepath = "5m_dataset/tr_sumhmin/updated_data5(4.11).csv"
data = pd.read_csv(file_path)

# Function to convert HHMM to datetime
def hhmm_to_datetime(hhmm):
    hour = hhmm // 100  # Extract the hour part
    minute = hhmm % 100  # Extract the minute part
    return pd.to_datetime(f'2024-04-11 {hour}:{minute}:00')

# Apply the conversion function to the SUM_HMIN column
data['DateTime'] = data['SUM_HMIN'].apply(hhmm_to_datetime)

# Save the updated dataframe back to a CSV file if needed

data.to_csv(save_filepath, index=False)

# Display the first few rows to confirm the conversion
print(data[['SUM_HMIN', 'DateTime']].head())