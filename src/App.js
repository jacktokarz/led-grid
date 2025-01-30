import { useState } from 'react';
import Grid from '@mui/material/Grid';

import './App.css';

import Entry from './Entry';
import LEDGRID from './LEDGRID';
import { Slider } from '@mui/material';

function App() {
	const [brightnessValue, setBrightnessValue] = useState(0); 
	const [ledGrid, setLedGrid] = useState(LEDGRID);
	const [selectedEntryLocation, setSelectedEntryLocation] = useState({row: 0, col: ''});
	console.log('selected:', ledGrid[selectedEntryLocation.row][selectedEntryLocation.col],'/', brightnessValue);
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
						onChange={(e, newValue) => {
							setBrightnessValue(newValue);
							const selectedLedEntry = ledGrid[selectedEntryLocation.row][selectedEntryLocation.col];
							const updatedLedEntry = {
								...selectedLedEntry,
								brightness: newValue,
							};
							const newLedGrid = [...ledGrid];
							newLedGrid[selectedEntryLocation.row][selectedEntryLocation.col] = updatedLedEntry;
							setLedGrid(newLedGrid);
						}}
					/>
				</Grid>
				<Grid item>
					<div className="table-container">
						<table>
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
										<tr>
											{Object.entries(row).map(([key, value]) => {
												return (
													<td
														key={value.id}
													>
														{!value.displayed ?
															'' :
															<div
																onClick={() => {
																	setSelectedEntryLocation({row: count, col: key});
																	setBrightnessValue(value.brightness);
																}}
															>
																LED
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
