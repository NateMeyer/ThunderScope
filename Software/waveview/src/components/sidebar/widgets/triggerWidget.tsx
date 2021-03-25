import React from 'react';
import { connect } from 'react-redux';
import './../../../css/sidebar/widgets/triggerWidget.css';
import VoltageUnit from '../../../configuration/enums/voltageUnit';
import TriggerType from '../../../configuration/enums/triggerType';

import CMD from '../../../configuration/enums/cmd';
import {Plumber, PlumberArgs} from '../../../util/plumber';
import { setChHelper } from '../../../util/setChHelper';

class TriggerWidget extends React.Component<any, any> {

  // Trigger Channel
  increaseChannel = () => {
    this.props.dispatch({type: 'trigger/increaseChannel'});
  }

  decreaseChannel = () => {
    this.props.dispatch({type: 'trigger/decreaseChannel'});
  }

  changeChannel = (channelNumber: number) => {
    let chStatus = (this.props.verticalWidget.settings as any[]).map(x => x.status > 0);
    let setChState = setChHelper(chStatus[0], chStatus[1], chStatus[2], chStatus[3], channelNumber);
    Plumber.getInstance().handleSetChState(setChState);
    this.props.dispatch({type: 'vertical/setChannelOrder', payload: setChState.chOrder});
    this.props.dispatch({type: 'trigger/changeChannel', payload: channelNumber});
    this.props.dispatch({type: 'vertical/changeChannelStatus', payload: channelNumber - 1});
  }

  // Trigger Type
  changeTriggerType = (triggerType: TriggerType) => {
    let edgeNum = (triggerType === TriggerType.RisingEdge) ? 1 : 2;
    let args: PlumberArgs = {
      headCheck: () => true,
      bodyCheck: () => true,
      cmd: CMD.CMD_SetEdgeType,
      id: 0,
      writeData: [edgeNum, 0]
    }
    Plumber.getInstance().cycle(args);
    this.props.dispatch({type: 'trigger/changeTriggerType', payload: triggerType});
  }

  // Trigger Level
  increaseTriggerLevel = () => {
    //TODO: Plumber call
    //(TRIGGER LEVEL (V))/((VOLTAGE RANGExDIVISIONS)/256)
    this.props.dispatch({type: 'trigger/increaseTriggerLevelValue'});
  }

  decreaseTriggerLevel = () => {
    //TODO: Plumber call
    //(TRIGGER LEVEL (V))/((VOLTAGE RANGExDIVISIONS)/256)
    this.props.dispatch({type: 'trigger/decreaseTriggerLevelValue'});
  }

  // Trigger Level Unit
  changeTriggerLevelUnit = (voltageUnit: VoltageUnit) => {
    //TODO: unit analysis, plumber call
    //(TRIGGER LEVEL (V))/((VOLTAGE RANGExDIVISIONS)/256)
    this.props.dispatch({type: 'trigger/changeTriggerLevelUnit', payload: voltageUnit});
  }

  render() {
    return (
      <div className="TriggerWidget">
      <div className="WidgetTitle">
        Trigger
      </div>

      <div className="ChannelTitle">
        Channel
      </div>
      <div className="ChannelSelectionButtons">
        <button
          className="Channel1Button"
          onClick={() => this.changeChannel(1)}>
          <label
            className={"Channel1ButtonText"}
            style={{color: this.props.triggerWidget.triggerChannel === 1 ? this.props.settings.colors.channel[this.props.triggerWidget.triggerChannel-1] : "black"}}>
            CH1
          </label>
        </button>
        <button
          className="Channel2Button"
          onClick={() => this.changeChannel(2)}>
          <label
            className={"Channel2ButtonText"}
            style={{color: this.props.triggerWidget.triggerChannel === 2 ? this.props.settings.colors.channel[this.props.triggerWidget.triggerChannel-1] : "black"}}>
            CH2
          </label>
        </button>
        <button
          className="Channel3Button"
          onClick={() => this.changeChannel(3)}>
          <label
            className={"Channel3ButtonText"}
            style={{color: this.props.triggerWidget.triggerChannel === 3 ? this.props.settings.colors.channel[this.props.triggerWidget.triggerChannel-1] : "black"}}>
            CH3
          </label>
        </button>
        <button
          className="Channel4Button"
          onClick={() => this.changeChannel(4)}>
          <label
            className={"Channel4ButtonText"}
            style={{color: this.props.triggerWidget.triggerChannel === 4 ? this.props.settings.colors.channel[this.props.triggerWidget.triggerChannel-1] : "black"}}>
            CH4
          </label>
        </button>
      </div>

      <div className="TriggerModeTitle">
        Trigger Mode
      </div>
      <div className="TriggerModeButtons">
        <button
          className="FallingEdgeButton"
          onClick={() => this.changeTriggerType(TriggerType.FallingEdge)}>
          <label
            className="FallingEdgeButtonText"
            style={{fontWeight: this.props.triggerWidget.triggerType[this.props.triggerWidget.triggerChannel-1] === TriggerType.FallingEdge ? "bold" : "normal"}}>
            Falling Edge
          </label>
        </button>
        <button
          className="RisingEdgeButton"
          onClick={() => this.changeTriggerType(TriggerType.RisingEdge)}>
          <label
            className="RisingEdgeButtonText"
            style={{fontWeight: this.props.triggerWidget.triggerType[this.props.triggerWidget.triggerChannel-1] === TriggerType.RisingEdge ? "bold" : "normal"}}>
            Rising Edge
          </label>
        </button>
      </div>

      <div className="TriggerLevelTitle">
        Trigger Level
      </div>
      <div className="TriggerWidgetAdjustTriggerLevelValue">
        <button
          className="MinusButton"
          onClick={() => this.decreaseTriggerLevel()}>
          -
        </button>
        <label
          className="AdjustChannelBlockValue"
          style={{color: this.props.settings.colors.channel[this.props.triggerWidget.triggerChannel-1]}}
        >
          {this.props.triggerWidget.triggerLevel[this.props.triggerWidget.triggerChannel-1].value.toString()}
          {this.props.triggerWidget.triggerLevel[this.props.triggerWidget.triggerChannel-1].unit}
        </label>
        <button
          className="PlusButton"
          onClick={() => this.increaseTriggerLevel()}>
          +
        </button>
      </div>

      <div className="TriggerWidgetAdjustTriggerLevelUnit">
        <button
          className="NanoVoltButton"
          onClick={() => this.changeTriggerLevelUnit(VoltageUnit.NanoVolt)}>
          <label
            className={"NanoVoltButtonText"}
            style={{fontWeight: this.props.triggerWidget.triggerLevel[this.props.triggerWidget.triggerChannel-1].unit === VoltageUnit.NanoVolt ? "bold" : "normal"}}>
            {VoltageUnit.NanoVolt}
          </label>
        </button>
        <button
          className="MicroVoltButton"
          onClick={() => this.changeTriggerLevelUnit(VoltageUnit.MicroVolt)}>
          <label
            className={"MicroVoltButtonText"}
            style={{fontWeight: this.props.triggerWidget.triggerLevel[this.props.triggerWidget.triggerChannel-1].unit === VoltageUnit.MicroVolt ? "bold" : "normal"}}>
            {VoltageUnit.MicroVolt}
          </label>
        </button>
        <button
          className="MilliVoltButton"
          onClick={() => this.changeTriggerLevelUnit(VoltageUnit.MilliVolt)}>
          <label
            className={"MilliVoltButtonText"}
            style={{fontWeight: this.props.triggerWidget.triggerLevel[this.props.triggerWidget.triggerChannel-1].unit === VoltageUnit.MilliVolt ? "bold" : "normal"}}>
            {VoltageUnit.MilliVolt}
          </label>
        </button>
        <button
          className="VoltButton"
          onClick={() => this.changeTriggerLevelUnit(VoltageUnit.Volt)}>
          <label
            className={"VoltButtonText"}
            style={{fontWeight: this.props.triggerWidget.triggerLevel[this.props.triggerWidget.triggerChannel-1].unit === VoltageUnit.Volt ? "bold" : "normal"}}>
            {VoltageUnit.Volt}
          </label>
        </button>
      </div>

    </div>
    )
  }
}

function mapStateToProps(state: { triggerWidget: any, settings: any, verticalWidget: any }) {
  return {
    triggerWidget: state.triggerWidget,
    settings: state.settings,
    verticalWidget: state.verticalWidget
  };
}

export default connect(mapStateToProps)(TriggerWidget);
