/**
 * @fileoverview The generic canvas graphics wrapper class.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cn.ui.GameCanvas');

goog.require('cn.constants');
goog.require('goog.dom.classes');
goog.require('goog.graphics.CanvasGraphics');



/**
 * @param {number} width The entire game's screen width.
 * @param {number} height The entire game's screen height.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.graphics.CanvasGraphics}
 */
cn.ui.GameCanvas = function(width, height, opt_domHelper) {
  goog.base(this, width, height, null, null, opt_domHelper);
};
goog.inherits(cn.ui.GameCanvas, goog.graphics.CanvasGraphics);


/**
 * Draws a given model with its corresponding stroke and fill styles. If the
 * model is composed of any sub-models, those are recursively drawn as well.
 * @param {!cn.model.PathModel} model The model to draw.
 */
cn.ui.GameCanvas.prototype.drawPathModel = function(model) {
  this.drawPath(model.path, model.stroke, model.fill);
  model.forEachSubModel(function(model) { this.drawPathModel(model); }, this);
};


/**
 * @inheritDoc
 */
cn.ui.GameCanvas.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  goog.dom.classes.add(this.getElement(), cn.constants.GAME_CANVAS_CLASS_NAME);
};
