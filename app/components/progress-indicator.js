import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sidebar-gauge-container'],
  gauge: null,
  min: null,
  max: null,

  didInsertElement() {
    this._super(...arguments);
    this.gauge = new JustGage({
      id: this.get('gauge-id'),
      min: this.get('min'),
      max: this.get('max'),
      value: this.get('value'),
      hideMinMax: true,
      hideValue: true,
      needleTail: true,
      pointer: true,
      levelColors: ['#C1D32B', "#D4C92A", '#C91418'],
      gaugeColor: 'white',
    });
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.gauge.refresh(this.get('value'));
  }
});
