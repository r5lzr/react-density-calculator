import { useState, useEffect } from "react";

function OutputRow({measureValue, unitValue, densityValue, densityUnit, massValue, massUnit, volumeValue, volumeUnit}) {
  const [calc, setCalc] = useState('');
  const [units, setUnits] = useState(null);

  const Calculate = () => {
    if (measureValue === 'density' && unitValue === 'kg/m^3') {
      const massConverted = MassConversion(massValue);
      const volumeConverted = VolumeConversion(volumeValue);
      const calculate_density = massConverted / volumeConverted;
      setCalc(calculate_density);

    } else if (measureValue === 'density' && unitValue === 'g/cm^3') {
      const massConverted = MassConversion(massValue);
      const volumeConverted = VolumeConversion(volumeValue);
      const calculate_density = massConverted / volumeConverted;
      setCalc(calculate_density);

    } else if (measureValue === 'mass' && unitValue === 'kg') {
      const densityConverted = DensityConversion(densityValue);
      const volumeConverted = VolumeConversion(volumeValue);
      const calculate_mass = densityConverted * volumeConverted;
      setCalc(calculate_mass);

    } else if (measureValue === 'mass' && unitValue === 'g') {
      const densityConverted = DensityConversion(densityValue);
      const volumeConverted = VolumeConversion(volumeValue);
      const calculate_mass = densityConverted * volumeConverted;
      setCalc(calculate_mass);

    } else if (measureValue === 'volume' && unitValue === 'm^3') {
      const massConverted = MassConversion(massValue);
      const densityConverted = DensityConversion(densityValue);
      const calculate_volume = massConverted / densityConverted;
      setCalc(calculate_volume);

    } else if (measureValue === 'volume' && unitValue === 'cm^3') {
      const massConverted = MassConversion(massValue);
      const densityConverted = DensityConversion(densityValue);
      const calculate_volume = massConverted / densityConverted;
      setCalc(calculate_volume);
    }
    setUnits(unitValue);
  }

  function DensityConversion(value) {
    if (unitValue === 'kg' && densityUnit === 'g/cm^3') {
      return value * 1000 // g/cm^3 to kg/m^3
    } else if (unitValue === 'g' && densityUnit === 'kg/m^3') {
        return value / 1000 // kg/m^3 to g/cm^3
    } else if (unitValue === 'm^3' && densityUnit === 'g/cm^3') {
      return value * 1000 // kg/m^3 to g/cm^3
    } else if (unitValue === 'cm^3' && densityUnit === 'kg/m^3') {
      return value / 1000 // kg/m^3 to g/cm^3
    } else {
        return value
    }
  }

  function MassConversion(value) {
    if (unitValue === 'kg/m^3' && massUnit === 'g') {
      return value / 1000
    } else if (unitValue === 'g/cm^3' && massUnit === 'kg') {
        return value * 1000
    } else if (unitValue === 'm^3' && massUnit === 'g') {
        return value / 1000
    } else if (unitValue === 'cm^3' && massUnit === 'kg') {
        return value * 1000
    } else {
        return value
    }
  }

  function VolumeConversion(value) {
    if (unitValue === 'kg/m^3' && volumeUnit === 'cm^3') {
      return value / 1000000
    } else if (unitValue === 'g/cm^3' && volumeUnit === 'm^3') {
        return value * 1000000
    } else if (unitValue === 'kg' && volumeUnit === 'cm^3') {
        return value / 1000000 // cm^3 to m^3
    } else if (unitValue === 'g' && volumeUnit === 'm^3') {
      return value * 1000000 // m^3 to cm^3
    } else {
        return value
    }
  }

  return (
    <>
      <div className="output-buttons">
        <button type="reset" id="reset-btn">Reset</button>
        <button type="calculate" id="calculate-btn" onClick={Calculate}>Calculate</button>
      </div>
      <div>
          <h1 id="result">{calc} {units}</h1>
      </div>
    </>
  );
}

function DensityUnitBox({densityUnit, handleDensityUnit}) {
  const densityArray = unitOptions['density'];

  return(
    <div>
      <select name="density-unit" id="density-unit" value={densityUnit} onChange={(e) => handleDensityUnit(e.target.value)}>
      {densityArray.map((unit, index) => (
        <option key={index} value={unit}>
          {unit}
        </option>
      ))}
      </select>
    </div>
  );
}

function MassUnitBox({massUnit, handleMassUnit}) {
  const massArray = unitOptions['mass'];

  return(
    <div>
      <select name="mass-unit" id="mass-unit" value={massUnit} onChange={(e) => handleMassUnit(e.target.value)}>
      {massArray.map((unit, index) => (
        <option key={index} value={unit}>
          {unit}
        </option>
      ))}
      </select>
    </div>
  );
}

function VolumeUnitBox({volumeUnit, handleVolumeUnit}) {
  const volumeArray = unitOptions['volume'];

  return(
    <div>
      <select name="volume-unit" id="volume-unit" value={volumeUnit} onChange={(e) => handleVolumeUnit(e.target.value)}>
      {volumeArray.map((unit, index) => (
        <option key={index} value={unit}>
          {unit}
        </option>
      ))}
      </select>
    </div>
  );
}

function MassVolumeInputRow({measureValue, unitValue, massValue, volumeValue, handleMassInput, handleVolumeInput}) {
  const [massUnit, setMassUnit] = useState('kg');
  const [volumeUnit, setVolumeUnit] = useState('m^3');

  useEffect(() => {
    const massArray = unitOptions['mass'];
    const volumeArray = unitOptions['volume'];

    setMassUnit(massArray[0]);
    setVolumeUnit(volumeArray[0]);

  }, [measureValue]);

  return (
    <>
      <div className="input-container">
        <div className="mass-block">
          <label htmlFor="mass-input" className='input-label'>Mass</label>
          <input className="compact-input" type="number" id="mass-input" value={massValue} onChange={(e) => handleMassInput(e.target.value)}/>
          <MassUnitBox massUnit={massUnit} handleMassUnit={setMassUnit} />
        </div>

        <div className="volume-block">
          <label htmlFor="volume-input" className='input-label'>Volume</label>
          <input className="compact-input" type="number" id="volume-input" value={volumeValue} onChange={(e) => handleVolumeInput(e.target.value)}/>
          <VolumeUnitBox volumeUnit={volumeUnit} handleVolumeUnit={setVolumeUnit}/>
        </div>
      </div>

      <div className="output-container">
        <OutputRow
        measureValue={measureValue}
        unitValue={unitValue}
        massValue={massValue}
        volumeValue={volumeValue}
        massUnit={massUnit}
        volumeUnit={volumeUnit} />
      </div>
    </>
  );
}

function DensityVolumeInputRow({measureValue, unitValue, densityValue, volumeValue, handleDensityInput, handleVolumeInput}) {
  const [densityUnit, setDensityUnit] = useState('kg/m^3');
  const [volumeUnit, setVolumeUnit] = useState('m^3');

  useEffect(() => {
    const densityArray = unitOptions['density'];
    const volumeArray = unitOptions['volume'];

    setDensityUnit(densityArray[0]);
    setVolumeUnit(volumeArray[0]);

  }, [measureValue]);

  return (
    <div>
      <div>
      <label htmlFor="density-input" className='input-label'>Density</label>
      <input className="compact-input" type="number" id="density-input" value={densityValue} onChange={(e) => handleDensityInput(e.target.value)}/>
      <DensityUnitBox densityUnit={densityUnit} handleDensityUnit={setDensityUnit} />
      </div>

      <div>
      <label htmlFor="volume-input" className='input-label'>Volume</label>
      <input className="compact-input" type="number" id="volume-input" value={volumeValue} onChange={(e) => handleVolumeInput(e.target.value)}/>
      <VolumeUnitBox volumeUnit={volumeUnit} handleVolumeUnit={setVolumeUnit}/>
      </div>

      <div>
      <OutputRow
      measureValue={measureValue}
      unitValue={unitValue}
      densityValue={densityValue}
      volumeValue={volumeValue}
      densityUnit={densityUnit}
      volumeUnit={volumeUnit} />
      </div>
    </div>
  );
}

function MassDensityInputRow({measureValue, unitValue, massValue, densityValue, handleMassInput, handleDensityInput}) {
  const [massUnit, setMassUnit] = useState('kg');
  const [densityUnit, setDensityUnit] = useState('kg/m^3');

  useEffect(() => {
    const massArray = unitOptions['mass'];
    const densityArray = unitOptions['density'];

    setMassUnit(massArray[0]);
    setDensityUnit(densityArray[0]);

  }, [measureValue]);

  return (
    <div>
      <div>
      <label htmlFor="mass-input" className='input-label'>Mass</label>
      <input className="compact-input" type="number" id="mass-input" value={massValue} onChange={(e) => handleMassInput(e.target.value)} />
      <MassUnitBox massUnit={massUnit} handleMassUnit={setMassUnit} />
      </div>

      <div>
      <label htmlFor="density-input" className='input-label'>Density</label>
      <input className="compact-input" type="number" id="density-input" value={densityValue} onChange={(e) => handleDensityInput(e.target.value)} />
      <DensityUnitBox densityUnit={densityUnit} handleDensityUnit={setDensityUnit} />
      </div>

      <div>
      <OutputRow
      measureValue={measureValue}
      unitValue={unitValue}
      massValue={massValue}
      densityValue={densityValue}
      massUnit={massUnit}
      densityUnit={densityUnit} />
      </div>
    </div>
  );
}

function InputSection({measureValue, unitValue}) {
  const [densityValue, setDensityValue] = useState('');
  const [massValue, setMassValue] = useState('');
  const [volumeValue, setVolumeValue] = useState('');

  useEffect(() => {
    setDensityValue('');
    setMassValue('');
    setVolumeValue('')
  }, [measureValue]);

  return (
    <>
      {measureValue === 'density' && <MassVolumeInputRow
      measureValue={measureValue}
      unitValue={unitValue}
      massValue={massValue}
      volumeValue={volumeValue}
      handleMassInput={setMassValue}
      handleVolumeInput={setVolumeValue} />}

      {measureValue === 'mass' && <DensityVolumeInputRow
      measureValue={measureValue}
      unitValue={unitValue}
      densityValue={densityValue}
      volumeValue={volumeValue}
      handleDensityInput={setDensityValue}
      handleVolumeInput={setVolumeValue} />}

      {measureValue === 'volume' && <MassDensityInputRow
      measureValue={measureValue}
      unitValue={unitValue}
      massValue={massValue}
      densityValue={densityValue}
      handleMassInput={setMassValue}
      handleDensityInput={setDensityValue} />}
    </>
  );
}

function UnitsRow({ measureValue, unitValue, handleUnitChange }) {

  const units = unitOptions[measureValue];

  return (
    <div>
      <label htmlFor="unit-select">Select Units:</label>
      <select id="unit-select" value={unitValue} onChange={(e) => handleUnitChange(e.target.value)}>
        {units.map((unit, index) => (
          <option key={index} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  );
}

function SolveForRow({measureValue, handleMeasureChange}) {

  return (
    <div>
      <label htmlFor="measure">Solve for:</label>
      <select name="measure" id="measure" value={measureValue} onChange={(e) => handleMeasureChange(e.target.value)}>
        <option value="density">Density</option>
        <option value="mass">Mass</option>
        <option value="volume">Volume</option>
      </select>
    </div>
  );
}

const unitOptions = {
  density: ['kg/m^3', 'g/cm^3'],
  mass: ['kg', 'g'],
  volume: ['m^3', 'cm^3']
};

export default function Calculator() {
  const [measureValue, setMeasureValue] = useState('density');
  const [unitValue, setUnitValue] = useState('kg/m^3');

  // Use useEffect to update unitValue when measureValue changes
  useEffect(() => {
    // Get the current units for the selected measurement
    const units = unitOptions[measureValue];

    setUnitValue(units[0]);

  }, [measureValue]);

  return (
    <div className="background">
      <div className="container">
        <SolveForRow measureValue={measureValue} handleMeasureChange={setMeasureValue}/>
        <UnitsRow measureValue={measureValue} unitValue={unitValue} handleUnitChange={setUnitValue}/>
        <InputSection measureValue={measureValue} unitValue={unitValue}/>
      </div>
    </div>
  );
}
