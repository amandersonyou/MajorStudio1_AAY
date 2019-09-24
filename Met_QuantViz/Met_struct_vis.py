# Met Quantitative Visual Assignment
# Amanda Anderson-You
# 09/24/19


import pandas as pd
import plotly.express as px
import plotly.graph_objects as go


# Use pandas to read the .csv file with approximately 5k object records of landscape art at the Met.
# Existing csv columns used include departments & end date year. CSV contains additional object level information in
# case needed.
df = pd.read_csv('MetLandscape_Details.csv', delimiter=',')

# Create a tidy Pandas DataFrame from the csv file.
# Use reset_index to make an Artworks column totaling the unique instances of both department and year.
df = df.groupby(['Department', 'Year']).size().reset_index(name='Artworks')
# print(df)

# Using vectors to plot all points at once
# Plotly uses D3, the user is able to hover over each point for additional detail

# Plotly Scatter Plot:
fig = px.scatter(df, x="Year", y="Artworks", color="Department")
fig.update_layout(
    title='Landscapes at the Metropolitan Museum of Art',
        font=dict(
            family="Times, monospace",
            size=20,
            color="#7f7f7f"
    )
)
fig.update_layout(

    xaxis=go.layout.XAxis(
        title=go.layout.xaxis.Title(
            text="Years of Artwork Creation",
            font=dict(
                family="Times, monospace",
                size=16,
                color="#7f7f7f"
            )
        )
    ),
    yaxis=go.layout.YAxis(
        title=go.layout.yaxis.Title(
            text="Artwork Quantity",
            font=dict(
                family="Times, monospace",
                size=16,
                color="#7f7f7f"
            )
        )
    )
)

fig.update_layout(

    legend=go.layout.Legend(
        traceorder="normal",
        font=dict(
            family="Times, monospace",
            size=14,
            color="#7f7f7f"
        ),
    )
)

fig.show()


# ----------------------------

# Plotly Line Plot:
fig = px.line(df, x='Year', y='Artworks', color='Department')
fig.update_layout(
    title='Landscapes at the Metropolitan Museum of Art',
        font=dict(
            family="Times, monospace",
            size=20,
            color="#7f7f7f"
    )
)
fig.update_layout(

    xaxis=go.layout.XAxis(
        title=go.layout.xaxis.Title(
            text="Years of Artwork Creation",
            font=dict(
                family="Times, monospace",
                size=16,
                color="#7f7f7f"
            )
        )
    ),
    yaxis=go.layout.YAxis(
        title=go.layout.yaxis.Title(
            text="Artwork Quantity",
            font=dict(
                family="Times, monospace",
                size=16,
                color="#7f7f7f"
            )
        )
    )
)
fig.update_layout(

    legend=go.layout.Legend(
        traceorder="normal",
        font=dict(
            family="Times, monospace",
            size=14,
            color="#7f7f7f"
        ),
    )
)
fig.show()



# Note: considered only departments with over 25 objects in order to not overwhelm the reader with too much data/color
# variation. Departments with under 25 objects include: Greek and Roman Art (2), Arms and Armor (12), The Cloisters (1),
# Arts of Africa, Oceania, and the Americas (11), Costume Institute (17), Islamic Art (22), Medieval Art (1), Musical
# Instruments (3). I also chose to consider landscapes in years AD and not BC which excludes (13) objects from year 0.
