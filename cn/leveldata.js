/**
 * @fileoverview All level data, where the vast majority is a clone of
 *     https://github.com/ruilov/CargoBot/blob/master/Levels.lua.
 *
 * @author elynnlee@cs.utexas.edu (Elynn Lee)
 *
 */

goog.provide('cn.LevelData');
goog.provide('cn.LevelData.levelpacks');
goog.provide('cn.LevelData.levels');

goog.require('cn.model.CargoColor');
goog.require('goog.array');



/**
 * @param {number} botPosition The initial bot position.
 * @param {!Array.<number>} stars A three-element array representing the minimum
 *     number of registers required to attain one, two, and three stars.
 * @param {!Array.<number>} functions The lengths of each available function.
 * @param {!Array.<string>} toolbox The available commands and conditionals.
 * @param {!Array.<!Array.<string>>} initial The initial cargo configuration.
 * @param {!Array.<!Array.<string>>} goal The final cargo configuration.
 * @param {string} hint A tip about the current level.
 * @constructor
 */
cn.LevelData = function(
    botPosition, stars, functions, toolbox, initial, goal, hint) {
  /** @type {number} */
  this.botPosition = botPosition - 1;

  /** @type {!Array.<number>} */
  this.stars = stars;

  /** @type {!Array.<number>} */
  this.functions = functions;

  /** @type {!Array.<string>} */
  this.toolbox = toolbox;

  /** @type {!Array.<!Array.<!cn.model.CargoColor>>} */
  this.initial = cn.LevelData.mapStacks_(initial);

  /** @type {!Array.<!Array.<!cn.model.CargoColor>>} */
  this.goal = cn.LevelData.mapStacks_(goal);

  /** @type {string} */
  this.hint = hint;
};


/**
 * @param {!Array.<!Array.<string>>} colors Stacks of colors (as implemented
 *     from the aforementioned source).
 * @return {!Array.<!Array.<!cn.model.CargoColor>>} The stack of colors as
 *     implemented in this rendition of Cargo-Bot.
 * @private
 */
cn.LevelData.mapStacks_ = function(colors) {
  return goog.array.map(
      colors,
      function(stack) {
        return goog.array.map(
            stack,
            function(color) {
              switch (color) {
                case 'red': return cn.model.CargoColor.RED;
                case 'green': return cn.model.CargoColor.GREEN;
                case 'blue': return cn.model.CargoColor.BLUE;
                case 'yellow': return cn.model.CargoColor.YELLOW;
                default: throw Error('no cargo implementation for: ' + color);
              }
            });
      });
};


/**
 * @type {Object.<string, !Array.<string>>}
 * @const
 */
cn.LevelData.levelpacks = {
  'Tutorial': [
    'CARGO 101',
    'TRANSPORTER',
    'RE-CURSES',
    'INVERTER',
    'FROM BENEATH',
    'GO LEFT'
  ],
  'Easy': [
    'DOUBLE FLIP',
    'GO LEFT 2',
    'SHUFFLE SORT',
    'GO THE DISTANCE',
    'COLOR SORT',
    'WALKING PILES'
  ],
  'Medium': [
    'REPEAT INVERTER',
    'DOUBLE SORT',
    'MIRROR',
    'LAY IT OUT',
    'THE STACKER',
    'CLARITY'
  ],
  'Hard': [
    'COME TOGETHER',
    'COME TOGETHER 2',
    'UP THE GREENS',
    'FILL THE BLANKS',
    'COUNT THE BLUES',
    'MULTI SORT'
  ],
  'Crazy': [
    'DIVIDE BY TWO',
    'THE MERGER',
    'EVEN THE ODDS',
    'GENETIC CODE',
    'MULTI SORT 2',
    'THE SWAP'
  ],
  'Impossible': [
    'RESTORING ORDER',
    'CHANGING PLACES',
    'PALETTE SWAP',
    'MIRROR 2',
    'CHANGING PLACES 2',
    'VERTICAL SORT'
  ]
};


/**
 * @type {Object.<string, !cn.LevelData>}
 * @const
 */
cn.LevelData.levels = {
  'CARGO 101': new cn.LevelData(
      1,
      [3, 3, 3],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4'],
      [['yellow'], []],
      [[], ['yellow']],
      'Down, Right, Down'
  ),
  'TRANSPORTER': new cn.LevelData(
      1,
      [5, 5, 4],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4'],
      [['yellow'], [], [], []],
      [[], [], [], ['yellow']],
      'Reuse the solution from level 1 and loop through it.\n\nThe shortest ' +
          'solution uses 4 registers.'
  ),
  'RE-CURSES': new cn.LevelData(
      1,
      [10, 5, 5],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4'],
      [['yellow', 'yellow', 'yellow', 'yellow'], []],
      [[],
        ['yellow', 'yellow', 'yellow', 'yellow']],
      'Move one crate to the right, go back to the original position, and ' +
          'then loop.\n\nThe shortest solution uses 5 registers.'
  ),
  'INVERTER': new cn.LevelData(
      1,
      [15, 10, 10],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4'],
      [['blue', 'red', 'green', 'yellow'], [], [], [], [], []],
      [[], [], [], [], [], ['yellow', 'green', 'red', 'blue']],
      'Move all four blocks one spot to the right, and repeat.\n\nThe ' +
          'shortest solution uses 10 registers.'
  ),
  'FROM BENEATH': new cn.LevelData(
      1,
      [8, 6, 5],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'yellow',
        'none', 'multi'],
      [['yellow', 'blue', 'blue', 'blue', 'blue'], [], []],
      [[], ['blue', 'blue', 'blue', 'blue'], ['yellow']],
      'Go right once if holding blue, twice if holding yellow, and left if ' +
          'holding none. Repeat.\n\nThe shortest solution uses 5 registers.'
  ),
  'GO LEFT': new cn.LevelData(
      1,
      [15, 9, 9],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4'],
      [[], ['red', 'red', 'red'], ['green', 'green', 'green'],
        ['blue', 'blue', 'blue']],
      [['red', 'red', 'red'], ['green', 'green', 'green'],
        ['blue', 'blue', 'blue'], []],
      'Move each pile to the left. Repeat.\n\nThe shortest solution uses 9 ' +
          'registers.'
  ),
  'DOUBLE FLIP': new cn.LevelData(
      1,
      [12, 6, 5],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'red',
        'green', 'yellow', 'none', 'multi'],
      [['blue', 'red', 'green', 'yellow'], [], []],
      [[], [], ['blue', 'red', 'green', 'yellow']],
      'Go right once if holding any, twice if holding blue, and left if ' +
          'holding none. Repeat.\n\nThe shortest solution uses 5 registers.'
  ),
  'GO LEFT 2': new cn.LevelData(
      1,
      [8, 6, 4],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'red',
        'green', 'none', 'multi'],
      [[], ['red', 'red', 'red'], ['blue', 'blue', 'blue'],
        ['green', 'green', 'green']],
      [['red', 'red', 'red'], ['blue', 'blue', 'blue'],
        ['green', 'green', 'green'], []],
      'Go right if holding none, and left if holding any. Repeat.\n\nThe ' +
          'shortest solution uses 4 registers.'
  ),
  'SHUFFLE SORT': new cn.LevelData(
      2,
      [15, 10, 9],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4'],
      [[], ['blue', 'yellow', 'blue', 'yellow', 'blue', 'yellow'], []],
      [['blue', 'blue', 'blue'], [], ['yellow', 'yellow', 'yellow']],
      'Alternate left and right, and make sure to use F2 to shorten your ' +
          'solution.\n\nThe shortest solution uses 9 registers.'
  ),
  'GO THE DISTANCE': new cn.LevelData(
      1,
      [12, 6, 4],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'red', 'yellow',
        'none', 'multi'],
      [['yellow'], ['yellow'], ['yellow'], ['yellow'], ['yellow'], ['yellow'],
        [], ['red', 'red', 'red', 'red']],
      [['yellow'], ['yellow'], ['yellow'], ['yellow'], ['yellow'], ['yellow'],
        ['red', 'red', 'red', 'red'], []],
      'Go right if holding none, and left if holding red. Repeat.\n\nThe ' +
          'shortest solution uses 4 registers.'
  ),
  'COLOR SORT': new cn.LevelData(
      2,
      [14, 10, 8],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'red', 'green',
        'none', 'multi'],
      [[], ['green', 'green', 'red', 'green', 'red', 'red'], []],
      [['red', 'red', 'red'], [], ['green', 'green', 'green']],
      'Go over each of the 3 piles and drop or pick up based on the color. ' +
          'When over the left pile drop if red, when over the right pile ' +
          'drop if green.\n\nThe shortest known solution uses 8 registers, ' +
          'all in F1.'
  ),
  'WALKING PILES': new cn.LevelData(
      1,
      [13, 11, 9],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'none'],
      [['blue', 'blue', 'blue', 'blue'], ['blue', 'blue', 'blue', 'blue'],
        ['blue', 'blue', 'blue', 'blue'], [], [], [], []],
      [[], [], [], [], ['blue', 'blue', 'blue', 'blue'],
        ['blue', 'blue', 'blue', 'blue'], ['blue', 'blue', 'blue', 'blue']],
      'For a 3 star solution, move each pile 3 slots to the right, and then ' +
          'repeat. This method can be implemented with 10 registers.\n\nThe ' +
          'shortest known solution uses 9 registers (with an approach that ' +
          'is very specific to this configuration)'
  ),
  'REPEAT INVERTER': new cn.LevelData(
      1,
      [9, 7, 5],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'red',
        'green', 'yellow', 'none', 'multi'],
      [['yellow', 'red', 'green', 'blue'], [],
        ['yellow', 'red', 'green', 'blue'], [],
        ['yellow', 'red', 'green', 'blue'], []],
      [[], ['blue', 'green', 'red', 'yellow'], [],
        ['blue', 'green', 'red', 'yellow'], [],
        ['blue', 'green', 'red', 'yellow']],
      'It can be done with the usual 5 instructions and clever usage of ' +
          'conditional modifiers. Solutions with up to 7 instructions earn 3 ' +
          'stars.'
  ),
  'DOUBLE SORT': new cn.LevelData(
      2,
      [20, 14, 11],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'yellow',
        'none', 'multi'],
      [[], ['blue', 'blue', 'yellow', 'yellow'],
        ['yellow', 'blue', 'yellow', 'blue'], []],
      [['blue', 'blue', 'blue', 'blue'], [], [],
        ['yellow', 'yellow', 'yellow', 'yellow']],
      'Sort, go right, sort, go left. Repeat. Use at most 14 instructions ' +
          'for 3 stars.\n\nThe shortest known solution uses 11 registers.'
  ),
  'MIRROR': new cn.LevelData(
      1,
      [9, 7, 6],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'green', 'yellow',
        'none', 'multi'],
      [['yellow', 'yellow', 'yellow', 'yellow'], ['green', 'green'], ['green'],
        ['green'], ['green', 'green'], []],
      [[], ['green', 'green'], ['green'], ['green'], ['green', 'green'],
        ['yellow', 'yellow', 'yellow', 'yellow']],
      'Use at most 7 registers for 3 stars. There are various known ' +
          'solutions with 6 registers in F1, but no known solution with only 5.'
  ),
  'LAY IT OUT': new cn.LevelData(
      1,
      [13, 9, 7],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'green', 'none'],
      [['green', 'green', 'green', 'green', 'green', 'green'], [], [], [], [],
        []],
      [['green'], ['green'], ['green'], ['green'], ['green'], ['green']],
      'Move the pile one slot to the right and bring one crate back to the ' +
          'left.\n\nThe shortest known solution uses 7 registers.'
  ),
  'THE STACKER': new cn.LevelData(
      5,
      [12, 10, 8],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'yellow', 'none'],
      [[], ['yellow'], ['yellow'], ['yellow'], ['yellow'], ['yellow'],
        ['yellow'], []],
      [[], [], [], [], [], [], [],
        ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']],
      'Go left until you find an empty slot, and then move the last ' +
          'yellow crate one slot to the right. Repeat.\n\nThe shortest known ' +
          'solution uses 8 registers.'
  ),
  'CLARITY': new cn.LevelData(
      1,
      [9, 7, 6],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'red', 'green',
        'none', 'multi'],
      [['green', 'red', 'green'], ['green', 'green', 'green', 'red', 'green'],
        ['red', 'green', 'red', 'green'], ['red', 'green', 'green'], []],
      [['green', 'red'], ['green', 'green', 'green', 'red'],
        ['red', 'green', 'red'], ['red'],
        ['green', 'green', 'green', 'green', 'green']],
      'A disguised version of Mirror.'
  ),
  'COME TOGETHER': new cn.LevelData(
      1,
      [15, 9, 7],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'yellow', 'none'],
      [[], [], ['yellow', 'yellow', 'yellow'], ['yellow'], [], [],
        ['yellow', 'yellow']],
      [['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'], [], [], [],
        [], [], []],
      'You can go right and find a yellow crate, but when bringing it back ' +
          'how do you know when to stop so that you don\'t crash into the ?' +
          'wall\n\nIn F2 use the programming stack to count the number of ' +
          'times you have to go right until you find a yellow crate, then go ' +
          'back left that same number of times. Another way to look at it: ' +
          'F2 is a recursive function that goes right until it finds a ' +
          'crate, and then it goes back to the original position. It can be ' +
          'implemented with 4 registers.\n\nThe shortest known solution uses ' +
          'a total of 7 registers.'
  ),
  'COME TOGETHER 2': new cn.LevelData(
      1,
      [12, 10, 8],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'green', 'yellow',
        'none', 'multi'],
      [[], ['yellow'], ['yellow', 'green', 'green'], ['yellow'],
        ['yellow', 'green'], ['yellow'], ['green', 'green', 'green', 'green']],
      [['green', 'green', 'green', 'green', 'green', 'green', 'green'],
        ['yellow'], ['yellow'], ['yellow'], ['yellow'], ['yellow'], []],
      'Another stack puzzle. Re-use the solution from the previous level ' +
          'with a small modification.\n\nThe shortest known solution uses 8 ' +
          'registers.'
  ),
  'UP THE GREENS': new cn.LevelData(
      1,
      [12, 9, 7],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'green',
        'none', 'multi'],
      [['green'], ['blue', 'blue'], ['green'], [], ['blue', 'blue', 'blue'],
        ['green'], ['blue', 'blue'], ['blue', 'blue']],
      [['green', 'blue', 'blue'], [], ['green', 'blue', 'blue', 'blue'], [], [],
        ['green', 'blue', 'blue', 'blue', 'blue'], [], []],
      'Very similar to the previous two levels but let the stack unwind and ' +
          'reset when you find a green. To do this only go left if holding ' +
          'a blue.\n\nThe shortest known solution uses 7 registers.'
  ),
  'FILL THE BLANKS': new cn.LevelData(
      1,
      [20, 14, 11],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'red', 'green',
        'none', 'multi'],
      [['green', 'green', 'green', 'green'], ['red'], [], ['red'], [], [],
        ['red'], []],
      [[], ['red'], ['green'], ['red'], ['green'], ['green'], ['red'],
        ['green']],
      'As in the \"Lay It Out\" level, move the entire pile one slot to the ' +
          'right and bring one crate back to the left, except in the first ' +
          'iteration.\n\nThe shortest known solution uses 11 registers.'
  ),
  'COUNT THE BLUES': new cn.LevelData(
      1,
      [15, 12, 9],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'yellow',
        'none', 'multi'],
      [['yellow', 'blue', 'blue'], [], [], [], ['yellow', 'blue'], [], []],
      [[], ['blue', 'blue'], [], ['yellow'], [], ['blue'], ['yellow']],
      'Another stack puzzle. The number of blues indicates how many times ' +
          'to go right with the yellow.\n\nThe shortest known solution uses ' +
          '9 registers.'
  ),
  'MULTI SORT': new cn.LevelData(
      1,
      [16, 11, 11],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'yellow',
        'none', 'multi'],
      [[], ['blue', 'yellow'], [], ['yellow', 'yellow', 'blue'],
        ['yellow', 'blue', 'yellow', 'blue'], ['blue', 'yellow'], ['blue'], []],
      [['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'], [], [], [],
        [], [], [], ['blue', 'blue', 'blue', 'blue', 'blue', 'blue']],
      'Come Together for yellows, The Stacker for blues. Go forward until ' +
          'you find a crate. If blue, move it one slot further and come all ' +
          'the way back (using the stack) empty handed. If yellow, bring ' +
          'it back and drop it. Repeat.\n\nThe shortest known solution uses ' +
          '11 registers.'
  ),
  'DIVIDE BY TWO': new cn.LevelData(
      1,
      [20, 14, 12],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'none'],
      [['blue', 'blue', 'blue', 'blue'], [], ['blue', 'blue'], [],
        ['blue', 'blue', 'blue', 'blue', 'blue', 'blue'], [],
        ['blue', 'blue', 'blue', 'blue'], []],
      [['blue', 'blue'], ['blue', 'blue'], ['blue'], ['blue'],
        ['blue', 'blue', 'blue'], ['blue', 'blue', 'blue'], ['blue', 'blue'],
        ['blue', 'blue']],
      'Wind up the stack for every two crates. Move one crate back each time ' +
          'it unwinds.\n\nThe shortest known solution uses 12 registers.'
  ),
  'THE MERGER': new cn.LevelData(
      1,
      [9, 7, 6],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'red', 'none',
        'multi'],
      [['blue', 'blue', 'blue'], [], ['red', 'red', 'red']],
      [[], ['blue', 'red', 'blue', 'red', 'blue', 'red'], []],
      'Use the stack once in each blue, and unwind it in each red.\n\nThe ' +
          'shortest known solution uses 6 registers.'
  ),
  'EVEN THE ODDS': new cn.LevelData(
      1,
      [13, 11, 10],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'red',
        'green', 'yellow', 'none', 'multi'],
      [['green', 'green', 'green', 'green', 'green'], [], ['red', 'red'], [],
        ['blue', 'blue', 'blue'], [], ['yellow', 'yellow', 'yellow', 'yellow'],
        []],
      [['green'], ['green', 'green', 'green', 'green'], [], ['red', 'red'],
        ['blue'], ['blue', 'blue'], [],
        ['yellow', 'yellow', 'yellow', 'yellow']],
      'If the pile has an odd number of crates, leave one crate behind, ' +
          'otherwise move all of them. Use a sequence of moves that undoes ' +
          'itself when repeated to move the crates right, and make sure to ' +
          'execute it an even number of times.\n\nThe shortest known ' +
          'solution uses 10 registers.'
  ),
  'GENETIC CODE': new cn.LevelData(
      1,
      [29, 20, 17],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'green', 'yellow',
        'none', 'multi'],
      [['green', 'yellow', 'yellow', 'green', 'yellow', 'green'], [],
        ['yellow', 'yellow', 'yellow'], [], ['green', 'green', 'green']],
      [[], ['green', 'yellow', 'green', 'yellow', 'yellow', 'green'], [],
        ['green', 'yellow', 'yellow', 'green', 'yellow', 'green'], []],
      'The left pile gives instructions for how to construct the right pile. ' +
          'Wind up the entire stack on the left and unwind on the right.\n\n' +
          'The shortest known solution uses 17 registers.'
  ),
  'MULTI SORT 2': new cn.LevelData(
      1,
      [25, 17, 17],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'red',
        'green', 'yellow', 'none', 'multi'],
      [[], ['blue', 'yellow', 'red', 'green', 'yellow'], [],
        ['red', 'blue', 'blue', 'green', 'green', 'yellow'], [],
        ['red', 'green', 'yellow', 'red', 'blue'], []],
      [['blue', 'blue', 'blue', 'blue'], [], ['red', 'red', 'red', 'red'], [],
        ['green', 'green', 'green', 'green'], [],
        ['yellow', 'yellow', 'yellow', 'yellow']],
      'Go over each pile and either pick up conditional on none if over ' +
          'the even slots, or drop conditional on the corresponding color if ' +
          'over the odd slots.\n\nThe shortest known solution uses 17 ' +
          'registers.'
  ),
  'THE SWAP': new cn.LevelData(
      2,
      [15, 12, 10],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'red', 'green',
        'none', 'multi'],
      [['red', 'red', 'red'], [], ['green', 'green', 'green']],
      [['green', 'green', 'green'], [], ['red', 'red', 'red']],
      'Merge the piles in the middle, change parity, and unmerge.\n\nThe ' +
          'shortest known solution uses 10 registers.'
  ),
  'RESTORING ORDER': new cn.LevelData(
      1,
      [29, 20, 16],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'red', 'none',
        'multi'],
      [[], ['blue', 'red', 'blue', 'blue'], ['red', 'blue', 'red', 'blue'],
        ['blue', 'blue', 'blue'], ['red'], ['red', 'blue'], ['blue'], []],
      [[], ['blue', 'blue', 'blue'], ['blue', 'blue'], ['blue', 'blue', 'blue'],
        [], ['blue'], ['blue'], ['red', 'red', 'red', 'red', 'red']],
      'For each pile move the reds one slot to the right and the blues ' +
          'one slot to the left, but make sure to wind up a stack for ' +
          'the blues so that you can put them back afterwards. Repeat for ' +
          'each pile.\n\nThe shortest known solution uses 16 registers.'
  ),
  'CHANGING PLACES': new cn.LevelData(
      1,
      [20, 18, 17],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'red', 'green',
        'none', 'multi'],
      [['red'], ['red', 'red', 'red'], ['green', 'green', 'green'], [],
        ['red', 'red', 'red', 'red'], ['red', 'red'],
        ['green', 'green', 'green', 'green'], ['green']],
      [['red', 'red', 'red'], ['red'], [], ['green', 'green', 'green'],
        ['red', 'red'], ['red', 'red', 'red', 'red'], ['green'],
        ['green', 'green', 'green', 'green']],
      'Switch each pair of piles, in place. First move the left pile to ' +
          'the right, winding up the stack. Then move all crates to the left ' +
          'slot. Finally, unwind the stack moving a crate to the right each ' +
          'time.\n\nThe shortest known solution uses 17 registers.'
  ),
  'PALETTE SWAP': new cn.LevelData(
      2,
      [29, 18, 15],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'red', 'none',
        'multi'],
      [[], ['red', 'blue'], ['blue', 'red', 'blue', 'red'], ['blue', 'red'],
        ['blue', 'red', 'blue', 'red'], [],
        ['blue', 'red', 'blue', 'red', 'blue', 'red'], []],
      [[], ['blue', 'red'], ['red', 'blue', 'red', 'blue'], ['red', 'blue'],
        ['red', 'blue', 'red', 'blue'], [],
        ['red', 'blue', 'red', 'blue', 'red', 'blue'], []],
      'Go left and go right. Each time you do so, wind up the stack. When no ' +
          'more crates are left, unwind the stack going left and going ' +
          'right. Repeat. \n\nThe shortest known solution uses 15 registers.'
  ),
  'MIRROR 2': new cn.LevelData(
      1,
      [20, 15, 12],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'yellow', 'none'],
      [['yellow', 'yellow', 'yellow'], ['yellow', 'yellow'], ['yellow'], []],
      [[], ['yellow'], ['yellow', 'yellow'], ['yellow', 'yellow', 'yellow']],
      'Move the top crate of the 2nd pile one slot to the right, and bring ' +
          'the left pile all the way to the right.\n\nThe shortest known ' +
          'solution uses 12 registers.'
  ),
  'CHANGING PLACES 2': new cn.LevelData(
      1,
      [25, 19, 16],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'red', 'none'],
      [['red'], ['red', 'red', 'red'], ['red'],
        ['red', 'red', 'red', 'red', 'red'], [], ['red', 'red'],
        ['red', 'red', 'red', 'red'], ['red', 'red', 'red']],
      [['red', 'red', 'red'], ['red'], ['red', 'red', 'red', 'red', 'red'], [],
        ['red', 'red'], ['red', 'red', 'red', 'red'], ['red', 'red', 'red'],
        ['red']],
      'As in Changing Places, swap piles. Do that once for each pair of ' +
          'consecutive piles and you\'re done.\n\nThe shortest known ' +
          'solution uses 16 registers.'
  ),
  'VERTICAL SORT': new cn.LevelData(
      2,
      [29, 29, 20],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'green',
        'none', 'multi'],
      [[], ['green', 'blue', 'green', 'blue', 'blue'],
        ['blue', 'green', 'blue'], ['green', 'blue', 'blue', 'green'],
        ['blue', 'green'], ['blue', 'green', 'green', 'green', 'blue'], []],
      [[], ['green', 'green', 'blue', 'blue', 'blue'],
        ['green', 'blue', 'blue'], ['green', 'green', 'blue', 'blue'],
        ['green', 'blue'], ['green', 'green', 'green', 'blue', 'blue'], []],
      'Draw on ideas from previous sort levels.'
  ),
  'COUNT IN BINARY': new cn.LevelData(
      1,
      [29, 23, 17],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'green', 'none'],
      [['green', 'green', 'green', 'green', 'green', 'green'], [], [], [], [],
        [], []],
      [['green', 'green'], [], ['green'], ['green'], ['green'], [], ['green']],
      'Count up all the numbers in binary: 1, 10, 11, 100,...'
  ),
  'EQUALIZER': new cn.LevelData(
      1,
      [40, 40, 40],
      [10, 10, 10, 10, 6],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'f5', 'blue', 'red',
        'none', 'multi'],
      [[], ['blue', 'blue'], ['blue'], ['blue', 'blue', 'blue', 'blue', 'blue'],
        [], ['blue', 'blue'], ['blue', 'blue', 'blue', 'blue'], ['red']],
      [['blue', 'blue'], ['blue', 'blue'], ['blue', 'blue'], ['blue', 'blue'],
        ['blue', 'blue'], ['blue', 'blue'], ['blue', 'blue'], ['red']],
      ''
  ),
  'PARTING THE SEA': new cn.LevelData(
      1,
      [17, 17, 17],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'blue', 'none'],
      [[], ['blue', 'blue'], ['blue', 'blue'], ['blue', 'blue'],
        ['blue', 'blue'], ['blue', 'blue'], []],
      [['blue', 'blue', 'blue', 'blue', 'blue'], [], [], [], [], [],
        ['blue', 'blue', 'blue', 'blue', 'blue']],
      ''
  ),
  'THE TRICK': new cn.LevelData(
      2,
      [20, 14, 11],
      [8, 8, 8, 5],
      ['right', 'pickup', 'left', 'f1', 'f2', 'f3', 'f4', 'red', 'yellow',
        'none', 'multi'],
      [['yellow', 'red'], [], ['red', 'yellow']],
      [['red', 'yellow'], [], ['yellow', 'red']],
      'Bring the right pile to the middle, then the left pile to the middle. ' +
          'Finally unmerge the piles to their respective sides. \n\nThe ' +
          'shortest known solution uses 11 registers.'
  )
};
