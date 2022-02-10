# Area API documentation

This is the official documentation of our Area API.
Here you'll find everything you'll need to interact with the API and how to do it.

# Operations
## Area creation
The first one is the creation of an area (action / reaction).
To do it, you'll need to send a **POST** request to the server address using this format :

    localhost:8080/services/[actionNeeded]/new/

With those values in the **POST** request :

    values: [actionArgumentValue]
    reaction: [reactionNeeded]
    reaction_value: [reactionArgumentValue]
    id_user: [idUser]

Where :
- **[actionNeeded]** is the action triggering the area (see [End points part](#end-points)).
- **[actionArgumentValue]** is the parameter of the trigger. For example, it could be "rain" for the weather action trigger (see [End points part](#end-points) for more details).
- **[reactionNeeded]** is the reaction to be done in the area (see [Reactions list](#reactions-list) part).
- **[reactionArgumentValue]** is the parameter of the reaction. (for example, it could be the message to be sent for the slack reaction)
- **[idUser]** is the identifier of the actual user. This identifier can be found by via Firebase.

## Existing Areas getter
The second one is used to get the existing Areas.
You should use the following **GET** request with not specific parameters :

    localhost:8080/areas

# End points
## weather
Action used when the user wants to trigger a reaction when the weather changes to a specific value.
Those are the **[actionArgumentValue]** availables :
- rain
- clear
- sunny
- cloudy
### new
The "new" API call creates an Area with this action.
Here is an example :

    localhost:8080/services/weather/new

This must be called by a **POST** request (see [Area creation](#area-creation) for more details).

## tempunder
Action used when the user wants to trigger a reaction when the temperature pass below a specific value.
The **[actionArgumentValue]** availables are all integers between -50 and +50;
The temperature is understood in celcius degrees.
### new
The "new" API call creates an Area with this action.
Here is an example :

    localhost:8080/services/tempunder/new

This must be called by a **POST** request (see [Area creation](#area-creation) for more details).

## tempover
Action used when the user wants to trigger a reaction when the temperature pass above a specific value.
The **[actionArgumentValue]** availables are all integers between -50 and +50;
The temperature is understood in celcius degrees.
### new
The "new" API call creates an Area with this action.
Here is an example :

    localhost:8080/services/tempover/new

This must be called by a **POST** request (see [Area creation](#area-creation) for more details).

## areas
This call is used to get the existing Areas.
You should use the following **GET** request with not specific parameters :

    localhost:8080/areas

# Reactions list

