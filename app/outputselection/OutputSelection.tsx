import React from 'react';
import { Modal } from "react-native";
import { connect, Dispatch } from "react-redux";
import { IActionTypes } from '../Actions';
import { IState } from "../IState";
import { createInternalOutputChoice } from '../output/OutputActions';
import { IOutputChannel } from "../output/OutputState";
import { OutputSelectionItem } from './OutputSelectionItem';

interface IProps {
	channels: IOutputChannel[],
	select: (choice: number) => any
}

interface ILocalState {
	visible: boolean
}

class OutputSelectionBase extends React.Component<IProps, ILocalState> {
	constructor(props: IProps) {
		super(props)
		this.state = { visible: false }
	}

	render() {
		return <Modal
			visible={this.state.visible}
			onRequestClose={() => this.setState({ visible: false })}>
			{this.props.channels.map(channel =>
				<OutputSelectionItem
					key={channel.id}
					channel={channel}
					select={() => this.props.select(channel.id)} />
			)}
		</Modal>
	}

	private select(choice: number) {
		this.props.select(choice)
		this.setState({ visible: false })
	}
}
const mapStateToProps = (state: IState) => ({
	channels: state.output.channels
})
const mapDispatchToProps = (dispatch: Dispatch<IActionTypes>) => ({
	select: (choice: number) => dispatch(createInternalOutputChoice(choice))
})
const OutputSelection = connect(mapStateToProps, mapDispatchToProps)(OutputSelectionBase)
export default OutputSelection