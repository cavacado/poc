# p-o-c

This project titled : poc (for now) is my first WDI project.
It is a game inspired largely from bioshock hacking mini-game;
most people really hated the game because you were forced to context switch between action twitch versus slow methodical thinking. A perfect case study for thinking fast and thinking slow.

But anyway; as mentioned, this game reverse engineers the hacking mini game from bioshock; a much dumb downed version anyway.

Game mechanics will be described in the following sections.

Future extensions will incorporate card-jockey races from Nintendo (race like conditions to the end to improve game playability and extend multiplayer)
To do so would require extensive backend knowledge which I currently do not have.

## Getting Started

To get started; just clone the repo into your local computer; open index.html in google chrome** (not optimised for all browsers yet) and play the game!

### Prerequisites

No prerequisites required; just clone and play!

### How to Use

Game mechanics:

The objective of the game is to direct the purple gunk from the inlet square to the outlet square using the various pipes randomly generated by the application.

inlet square is marked by magenta color and outlet square is marked by a teal square

no specific way to play the game; short pipe flows are allowed; long pipe flows are also allowed.

there is an in-built scoring system that rewards players for constructing more elaborate pipes flows.
(need to apply a multiplier effect pop up in-game...).

* if a player constructs a pipe line with less than 6 tiles; no multiplier will be achieved. ie player gets 5 pts if he constructs with 5 tiles.
* if a player constructs a pipe with more than 6 tiles (excluding the inlet and outlet tile); he or she will have a multiplier of 2X; ie: if you manage to win with 8 tiles; you will get 16 points
* if a player manages to construct a pipeflow of more than 10 tiles; the multiplier will be increased up to 4 X! ie 11 --> 44 points

so in essence the player is rewarded for constructing longer pipes but that entails more risk.
the short pipes are easier to construct but reward the player with lesser points.

in addition; one could control the speed of the flows; increasing the speed of the flow by tapping *spacebar*. There are three options for speed; 3 (default) 2 and 1; and the lower the number the faster the speed.

Lastly, there is a hyperdrive mode in which the player can immediately complete the pipeflow by pressing *enter*. for eg: if the player already finishes his/her pipeflow; he does not need to wait for the gunk to flow slowly; he/she can press *enter* to immediately complete the pipeline. However; this requires a delay of until the animation of the current square is done. (coded that way, could be improved upon..)

So far why build upon speed? this is in order to future proof this project. As mentioned; further extensions will introduce a race condition will other players. This will provide an extra strategic element for this game.

So there might be different strategies for different players:

---
* persona 1:
  * he is impulsive and a quick thinker
  * his strategy consists of short pipes and fast flows
  * he finishes games quickly but earns relatively lesser points over time

* persona 2:
  * he is slow and methodical
  * his strategy consists of long and elaborate pipes and slow flows
  * he finishes relatively lesser games but will earn more points over time

* persona 3:
  * he is mad
  * he plays in a haphazard manner that it cannot be said that he has any strategies at all.
  * pt output is very varied.

Of course in reality, a combination of all 3 personas will be used depending on the game player.
Also the stage at which the player is at will influence the way he will play the game.
For example: at the last leg of the race; he will play more fast games to 'complete' the race.

## Tests

No tests have been written for this project. Rather, most tests were written dynamically within the program and troubleshooted accordingly.

## Live Version

Currently there isn't any live version of the game being hosted on any website.

In the future will do so. (probably something other than git-hub pages...)

## Built With

* Bootstrap 3.3.7
* Animate.css 3.5.2

## Workflow

Git and Github were my main version control system.

## Acknowledgments

* Special mention to karenliu1 for her git repo https://github.com/karenliu1/pipe-dream; for the various assets and the 'mental push' to convince myself that the project was do-able.

* Thanks to my friends (Wan yin and Hari) who helped me beta test the gameplay and suggested improvements to the game play. 
