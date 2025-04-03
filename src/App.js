import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Slider } from '@mui/material';
import ColorPicker from 'react-pick-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Entry from './Entry';
import LEDGRID from './LEDGRID';
import './App.css';

function App() {
	const [brightnessValue, setBrightnessValue] = useState(0); 
	const [ledGrid, setLedGrid] = useState(LEDGRID);
	const [selectedEntryLocation, setSelectedEntryLocation] = useState({row: 0, col: ''});
	console.log('selected:', ledGrid[selectedEntryLocation.row][selectedEntryLocation.col],'/', brightnessValue);
	const [pickerColor, setPickerColor] = useState('red');
	
	function updateLedGrid(newBrightness, newColor) {
		const selectedLedEntry = ledGrid[selectedEntryLocation.row][selectedEntryLocation.col];
		const updatedLedEntry = {
			...selectedLedEntry,
			brightness: newBrightness,
			color: newColor,
		};
		const newLedGrid = [...ledGrid];
		newLedGrid[selectedEntryLocation.row][selectedEntryLocation.col] = updatedLedEntry;
		setLedGrid(newLedGrid);
	}
	
  return (
    <div className='App'>
      <header className="App-header">
        <h1>Fun LED time!</h1>
      </header>
			<Grid container spacing={1} className="App-body">
				<Grid item xs={3} className="left-column">
					<p>
						{`LED data for: ${selectedEntryLocation.row}-${selectedEntryLocation.col}`}
					</p>
					<p>
						{`Brightness: ${brightnessValue}`}
					</p>
					<Slider
						value={brightnessValue}
						onChange={brightness => {
							console.log('new brightness: ',brightness.target);
							setBrightnessValue(brightness.target.value);
							updateLedGrid(brightness.target.value, pickerColor);
						}}
					/>
					<p>
						{`Color: ${pickerColor}`}
					</p>
					<ColorPicker
						color={pickerColor}
						onChange={color => {
							console.log('picked color: ',color);
							setPickerColor(color.hex);
							updateLedGrid(brightnessValue, color.hex);
						}}
					/>
				</Grid>
				<Grid item>
					<div className="table-container">
						<table
							style = {{
								'backgroundColor': '#7c7b7b',
								'color': '#ffffff',
								'fontSize': '36px',
								'padding': '8px 24px 24px 24px',
							}}
						>
							<thead>
								<th>A</th>
								<th>B</th>
								<th>C</th>
								<th>D</th>
								<th>E</th>
								<th>F</th>
								<th>G</th>
							</thead>
							<tbody>
								{ledGrid.map((row, count) => {
									return (
										<tr
											style={{
												'lineHeight': '90%'
											}}
										>
											{Object.entries(row).map(([key, value]) => {
												return (
													<td
														key={value.id}
														style={{
															'padding': '0 6px',
														 }}
													>
														{!value.displayed ?
															'' :
															<div
																onClick={() => {
																	setSelectedEntryLocation({row: count, col: key});
																	setBrightnessValue(value.brightness);
																	setPickerColor(value.color);
																}}
																style={{
																	'color': value.color,
																	'opacity': `${value.brightness}%`,
																}}
															>
																o
															</div>
														}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</Grid>
			</Grid>
		</div>
  );
}

export default App;
