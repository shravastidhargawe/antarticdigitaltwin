// POLAR-TWIN Production Bundle
// National Centre for Polar and Ocean Research (NCPOR)

const {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} = React;

// --- data/stationsData.js ---
// Antarctic Digital Twin - Station Registry & Telemetry Models
// National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Govt. of India

const STATIONS_DATA = {
  bharati: {
    id: "bharati",
    name: "Bharati Station",
    code: "BHA-02",
    tagline: "India's Aerodynamic Polar Research Outpost on Stilts",
    location: "Larsemann Hills, Prydz Bay, East Antarctica",
    coordinates: "69°24′28″S 76°11′14″E",
    status: "Operational",
    statusVariant: "normal",
    elevation: "35 m a.s.l.",
    commissioned: "2012",
    currentCrew: 28,
    winteringCapacity: 47,
    healthScore: 94,
    emergencyReadiness: "Condition Green (Nominal)",
    networkUplink: "ISRO NRSC Shadnagar GSAT Dedicated (9.1m C/X-Band)",
    environment: {
      temperature: -24.2,
      feelsLike: -36.8,
      windSpeed: 31.4,
      windGust: 44.2,
      windDirection: "SE (135°)",
      humidity: 62,
      pressure: 978.2,
      visibility: 14.0,
      snowfall: "Moderate (2.8 mm/h)",
      solarRadiation: 35.5,
      uvIndex: 1,
      katabaticAdvisory: "Moderate inland katabatic airflow descending from Polar Ice Sheet."
    },
    energy: {
      totalGenerationKw: 95.0,
      currentConsumptionKw: 78.4,
      peakCapacityKw: 140.0,
      batterySocPercent: 71.5,
      batteryCapacityKwh: 550.0,
      batteryVoltage: 48.2,
      fuelLevelPercent: 58.0,
      fuelLitres: 46200,
      fuelCapacityLitres: 80000,
      dailyBurnLitres: 1350,
      estimatedRuntimeDays: 34,
      generatorStatus: "DG-01 Primary (Online) • DG-02 Hot Standby",
      generatorTempC: 62.0,
      generatorVibration: 1.8,
      heatRecoveryEfficiency: 82.4,
      // Waste heat used for habitat hydronic heating
      loads: {
        heating_life_support: 28.2,
        research_equipment: 23.5,
        communications: 8.1,
        laboratory: 7.9,
        lighting: 6.2,
        emergency_systems: 4.5
      }
    },
    zones: [{
      id: "main_building",
      name: "Main Habitat & Command Superstructure",
      subsystem: "Command & Living",
      status: "Normal",
      temp: 21.2,
      targetTemp: 21.0,
      powerKw: 31.5,
      health: 96,
      alerts: 0,
      lastMaint: "6 days ago",
      desc: "Two-story aerodynamic superstructure enclosed in 134 modular prefabricated containers on 24 heavy-duty stilts with hydraulic jacks.",
      metrics: {
        co2Ppm: 580,
        humidityPct: 42,
        chpHeatInletC: 64.0,
        chpHeatOutletC: 48.2
      }
    }, {
      id: "generator_room",
      name: "Generator & CHP Thermal Plant",
      subsystem: "Power & Microgrid",
      status: "Normal",
      temp: 28.4,
      targetTemp: 26.0,
      powerKw: 4.6,
      health: 88,
      alerts: 0,
      lastMaint: "18 days ago",
      desc: "Dual Volvo Penta D13 350 kVA polar diesel generators with catalytic heat recovery exchangers supplying station central hydronic loops.",
      metrics: {
        dg1Rpm: 1500,
        dg1OilPressureBar: 4.8,
        dg1CoolantTempC: 62.0,
        glycolFlowRateLpm: 68.5
      }
    }, {
      id: "laboratory",
      name: "Oceanographic & Atmospheric Laboratory",
      subsystem: "Science & Payload",
      status: "Normal",
      temp: 20.1,
      targetTemp: 20.0,
      powerKw: 8.5,
      health: 95,
      alerts: 0,
      lastMaint: "10 days ago",
      desc: "Clean-room laboratories for seismology, magnetosphere monitoring, spectrophotometry, and coastal marine water samplers.",
      metrics: {
        airPurityIso: "Class 7",
        heliumFlowSccm: 120,
        lidarChillerTempC: 18.2,
        sensorNodesOnline: "42/42"
      }
    }, {
      id: "communication_room",
      name: "Satellite Radome & Telecommunications",
      subsystem: "Communications",
      status: "Normal",
      temp: 20.8,
      targetTemp: 20.0,
      powerKw: 8.1,
      health: 98,
      alerts: 0,
      lastMaint: "5 days ago",
      desc: "9.1m tracking parabolic dish protected inside a rigid geodesic radome, linked to National Remote Sensing Centre (NRSC) Shadnagar.",
      metrics: {
        uplinkFreqGhz: 8.24,
        snrDb: 18.6,
        antennaElevationDeg: 28.4,
        packetLossPct: 0.02
      }
    }, {
      id: "storage",
      name: "Provisions, Hardware & Cryo Depot",
      subsystem: "Logistics",
      status: "Normal",
      temp: 2.0,
      targetTemp: 2.0,
      powerKw: 3.8,
      health: 92,
      alerts: 0,
      lastMaint: "14 days ago",
      desc: "Climate-controlled survival rations, deep-freeze stores (-20°C walk-in freezer), polar hardware, and expedition mechanical spares.",
      metrics: {
        freezerCoreTempC: -21.4,
        dryRationDaysRemaining: 180,
        sparePartsInventoryIndex: "94%"
      }
    }, {
      id: "fuel_storage",
      name: "Bunded Polar Diesel Tank Farm",
      subsystem: "Fuel & Power",
      status: "Normal",
      temp: -6.8,
      targetTemp: -5.0,
      powerKw: 2.4,
      health: 86,
      alerts: 0,
      lastMaint: "16 days ago",
      desc: "Double-walled steel fuel storage tanks inside secondary containment bunding with trace-heated manifold piping preventing fuel wax formation.",
      metrics: {
        tank1LevelPct: 62.0,
        tank2LevelPct: 54.0,
        traceHeatingCurrentA: 14.2,
        leakSensorsStatus: "Dry / All Clear"
      }
    }, {
      id: "battery_room",
      name: "Station UPS & LiFePO4 Energy Buffer",
      subsystem: "Energy Storage",
      status: "Warning",
      temp: 24.8,
      targetTemp: 21.0,
      powerKw: 2.1,
      health: 79,
      alerts: 1,
      lastMaint: "7 days ago",
      desc: "550 kWh polar-certified lithium-iron-phosphate battery bank providing instantaneous peak shaving and emergency survival life support.",
      metrics: {
        cellVoltageVarianceMv: 38,
        socPct: 71.5,
        sohPct: 89.2,
        dischargeRateKw: 8.4
      }
    }, {
      id: "research_area",
      name: "Meteorological & LIDAR Mast Array",
      subsystem: "Weather & Sensor",
      status: "Normal",
      temp: -24.2,
      targetTemp: -24.2,
      powerKw: 5.4,
      health: 93,
      alerts: 0,
      lastMaint: "12 days ago",
      desc: "15m guyed instrument tower with heated ultrasonic anemometers, solar pyranometers, barometric sensors, and atmospheric LIDAR beam path.",
      metrics: {
        windSpeedRawMs: 16.2,
        anemometerDeicingCurrentA: 8.5,
        solarIrradianceWm2: 185.0
      }
    }]
  },
  maitri: {
    id: "maitri",
    name: "Maitri Station",
    code: "MAI-01",
    tagline: "India's Historic Antarctic Gateway in the Rock Oasis",
    location: "Schirmacher Oasis, Queen Maud Land, East Antarctica",
    coordinates: "70°45′58″S 11°43′56″E",
    status: "Operational",
    statusVariant: "normal",
    elevation: "117 m a.s.l.",
    commissioned: "1989",
    currentCrew: 23,
    winteringCapacity: 25,
    healthScore: 91,
    emergencyReadiness: "Condition Green (Nominal)",
    networkUplink: "Inmarsat BGAN & GSAT High-Latitude Dedicated Link",
    environment: {
      temperature: -18.4,
      feelsLike: -27.1,
      windSpeed: 24.2,
      windGust: 36.5,
      windDirection: "ESE (115°)",
      humidity: 68,
      pressure: 982.5,
      visibility: 18.5,
      snowfall: "Light (1.2 mm/h)",
      solarRadiation: 42.0,
      uvIndex: 1,
      katabaticAdvisory: "Calm airflow over rocky Schirmacher moraines."
    },
    energy: {
      totalGenerationKw: 82.5,
      currentConsumptionKw: 66.8,
      peakCapacityKw: 110.0,
      batterySocPercent: 84.0,
      batteryCapacityKwh: 400.0,
      batteryVoltage: 48.0,
      fuelLevelPercent: 64.2,
      fuelLitres: 38500,
      fuelCapacityLitres: 60000,
      dailyBurnLitres: 1100,
      estimatedRuntimeDays: 48,
      generatorStatus: "DG-01 Primary (Online) • DG-02 Standby",
      generatorTempC: 64.5,
      generatorVibration: 2.1,
      heatRecoveryEfficiency: 79.2,
      loads: {
        heating_life_support: 24.5,
        research_equipment: 18.2,
        laboratory: 7.1,
        communications: 6.8,
        lighting: 5.4,
        emergency_systems: 4.8
      }
    },
    zones: [{
      id: "main_building",
      name: "Maitri Main Habitat Complex",
      subsystem: "Command & Living",
      status: "Normal",
      temp: 20.5,
      targetTemp: 20.0,
      powerKw: 26.4,
      health: 95,
      alerts: 0,
      lastMaint: "12 days ago",
      desc: "Iconic modular habitat raised on steel stilts with living quarters, medical sickbay, galley, and operations control room.",
      metrics: {
        co2Ppm: 610,
        humidityPct: 45,
        chpHeatInletC: 62.5,
        chpHeatOutletC: 46.0
      }
    }, {
      id: "generator_room",
      name: "Power Generation Shed",
      subsystem: "Power & Microgrid",
      status: "Normal",
      temp: 32.1,
      targetTemp: 28.0,
      powerKw: 3.8,
      health: 89,
      alerts: 0,
      lastMaint: "8 days ago",
      desc: "Cummins KTA-19 continuous polar generation sets equipped with waste-heat water exchangers.",
      metrics: {
        dg1Rpm: 1500,
        dg1OilPressureBar: 4.6,
        dg1CoolantTempC: 64.5,
        glycolFlowRateLpm: 62.0
      }
    }, {
      id: "laboratory",
      name: "Geology & Limnology Laboratory",
      subsystem: "Science & Payload",
      status: "Normal",
      temp: 19.8,
      targetTemp: 20.0,
      powerKw: 7.2,
      health: 96,
      alerts: 0,
      lastMaint: "15 days ago",
      desc: "Dedicated Antarctic rock sample storage, sub-glacial ice core drilling workbench, and freshwater limnology analyzers.",
      metrics: {
        microscopeChamberHumidityPct: 35,
        coreSampleStorageTempC: -28.0,
        sensorNodesOnline: "36/36"
      }
    }, {
      id: "communication_room",
      name: "High-Latitude Satellite Terminal",
      subsystem: "Communications",
      status: "Normal",
      temp: 21.0,
      targetTemp: 20.0,
      powerKw: 6.8,
      health: 98,
      alerts: 0,
      lastMaint: "4 days ago",
      desc: "Protected satellite communications dome transmitting daily meteorological synoptic reports to WMO global telecommunication system.",
      metrics: {
        snrDb: 17.8,
        latencyMs: 512,
        packetLossPct: 0.04
      }
    }, {
      id: "storage",
      name: "Food & Hardware Cache Sheds",
      subsystem: "Logistics",
      status: "Normal",
      temp: -2.0,
      targetTemp: -2.0,
      powerKw: 4.5,
      health: 91,
      alerts: 0,
      lastMaint: "20 days ago",
      desc: "Exterior insulated container sheds housing year-round supplies, vehicle spare tracks, and mechanical hardware.",
      metrics: {
        freezerCoreTempC: -19.8,
        dryRationDaysRemaining: 210,
        sparePartsInventoryIndex: "91%"
      }
    }, {
      id: "fuel_storage",
      name: "Polar Diesel & ATF Fuel Bladders",
      subsystem: "Fuel & Power",
      status: "Warning",
      temp: -8.5,
      targetTemp: -6.0,
      powerKw: 2.1,
      health: 82,
      alerts: 1,
      lastMaint: "25 days ago",
      desc: "Heavy-duty fuel bladder park with heated supply lines feeding the generator manifold.",
      metrics: {
        tank1LevelPct: 64.2,
        tank2LevelPct: 60.0,
        traceHeatingCurrentA: 12.8,
        leakSensorsStatus: "Dry / All Clear"
      }
    }, {
      id: "battery_room",
      name: "Station UPS Battery Room",
      subsystem: "Energy Storage",
      status: "Normal",
      temp: 18.2,
      targetTemp: 18.0,
      powerKw: 1.2,
      health: 94,
      alerts: 0,
      lastMaint: "9 days ago",
      desc: "400 kWh deep-cycle battery installation maintaining critical habitat systems during generator transfer switch intervals.",
      metrics: {
        cellVoltageVarianceMv: 18,
        socPct: 84.0,
        sohPct: 94.5,
        dischargeRateKw: 3.2
      }
    }, {
      id: "research_area",
      name: "Lake Priyadarshini Water Extraction Line",
      subsystem: "Life Support",
      status: "Normal",
      temp: 4.2,
      targetTemp: 4.0,
      powerKw: 6.0,
      health: 90,
      alerts: 0,
      lastMaint: "11 days ago",
      desc: "Sub-ice water extraction intake pipe with continuous electrical trace heating drawing pristine meltwater from Lake Priyadarshini.",
      metrics: {
        waterFlowLpm: 32.5,
        intakePipeTempC: 3.8,
        pumpCurrentA: 9.4
      }
    }]
  }
};

// --- data/equipmentData.js ---
// Antarctic Digital Twin - Mission Critical Equipment Registry
// National Centre for Polar and Ocean Research (NCPOR)

const EQUIPMENT_DATA = [{
  id: "eq-dg-01",
  name: "Diesel Generator 01 (Primary Base-Load)",
  station: "Bharati Station",
  stationId: "bharati",
  category: "Power Generation",
  status: "Normal",
  statusVariant: "normal",
  temperature: 62.0,
  vibration: "1.8 mm/s (Nominal)",
  vibrationVal: 1.8,
  runtimeHours: 4210,
  mtbfHours: 8500,
  healthPercent: 88,
  lastMaint: "18 days ago",
  nextMaint: "12 days remaining (Oil & Filter Change)",
  spec: "Volvo Penta D13-MH Polar Marine Spec (350 kVA / 280 kWe)",
  oilPressureBar: 4.8,
  fuelConsumptionLph: 48.5,
  coolantLevelPct: 98,
  desc: "Primary electrical generator operating continuously in polar conditions with catalytic exhaust heat exchanger connected to station hydronic loop."
}, {
  id: "eq-dg-02",
  name: "Diesel Generator 02 (Hot Standby)",
  station: "Bharati Station",
  stationId: "bharati",
  category: "Power Generation",
  status: "Standby",
  statusVariant: "standby",
  temperature: 28.0,
  vibration: "0.0 mm/s (Idle)",
  vibrationVal: 0.0,
  runtimeHours: 3890,
  mtbfHours: 8500,
  healthPercent: 94,
  lastMaint: "5 days ago",
  nextMaint: "45 days remaining",
  spec: "Volvo Penta D13-MH Polar Marine Spec (350 kVA / 280 kWe)",
  oilPressureBar: 0.0,
  fuelConsumptionLph: 0.0,
  coolantLevelPct: 100,
  desc: "Fully redundant secondary generator maintained at pre-heated jacket temperature for automated bus-transfer startup within 15 seconds."
}, {
  id: "eq-hvac",
  name: "Hydronic Glycol Thermal Heat Recovery Loop",
  station: "Bharati Station",
  stationId: "bharati",
  category: "Life Support & Thermal",
  status: "Normal",
  statusVariant: "normal",
  temperature: 48.5,
  vibration: "0.9 mm/s (Nominal)",
  vibrationVal: 0.9,
  runtimeHours: 12800,
  mtbfHours: 25000,
  healthPercent: 91,
  lastMaint: "22 days ago",
  nextMaint: "8 days remaining",
  spec: "Dual-circuit Plate Heat Exchanger (50% Propylene Glycol)",
  oilPressureBar: 0.0,
  fuelConsumptionLph: 0.0,
  coolantLevelPct: 96,
  desc: "Extracts waste cylinder jacket and exhaust heat from active generator to circulate warmth through habitat baseboards and fan coil units."
}, {
  id: "eq-battery",
  name: "Station LiFePO4 Energy Storage Buffer",
  station: "Bharati Station",
  stationId: "bharati",
  category: "Energy Buffer",
  status: "Warning",
  statusVariant: "warning",
  temperature: 24.8,
  vibration: "0.0 mm/s",
  vibrationVal: 0.0,
  runtimeHours: 8900,
  mtbfHours: 20000,
  healthPercent: 79,
  lastMaint: "7 days ago",
  nextMaint: "Inspection Recommended (Cell Variance)",
  spec: "550 kWh Polar C-Rate LiFePO4 Modular Rack System",
  oilPressureBar: 0.0,
  fuelConsumptionLph: 0.0,
  coolantLevelPct: 100,
  desc: "Buffer bank dampening microgrid load swings, absorbing solar excess, and providing uninterruptible survival power during generator switchover."
}, {
  id: "eq-comms",
  name: "NRSC Earth Observation Ground Station Radome",
  station: "Bharati Station",
  stationId: "bharati",
  category: "Communications",
  status: "Normal",
  statusVariant: "normal",
  temperature: 18.5,
  vibration: "0.4 mm/s (Nominal)",
  vibrationVal: 0.4,
  runtimeHours: 21500,
  mtbfHours: 30000,
  healthPercent: 97,
  lastMaint: "4 days ago",
  nextMaint: "30 days remaining",
  spec: "9.1m Cassegrain Antenna with Hydrophobic Space-Frame Radome",
  oilPressureBar: 0.0,
  fuelConsumptionLph: 0.0,
  coolantLevelPct: 100,
  desc: "Dedicated high-gain dish tracking IRS and Oceansat polar-orbiting satellites with real-time telemetry backhaul to NRSC Hyderabad."
}, {
  id: "eq-water",
  name: "Desalination & Reverse Osmosis Unit",
  station: "Bharati Station",
  stationId: "bharati",
  category: "Life Support",
  status: "Normal",
  statusVariant: "normal",
  temperature: 12.0,
  vibration: "1.2 mm/s (Nominal)",
  vibrationVal: 1.2,
  runtimeHours: 6400,
  mtbfHours: 12000,
  healthPercent: 90,
  lastMaint: "14 days ago",
  nextMaint: "16 days remaining",
  spec: "Seawater RO Desalination Plant (4,000 Litres/Day)",
  oilPressureBar: 0.0,
  fuelConsumptionLph: 0.0,
  coolantLevelPct: 95,
  desc: "Purifies coastal marine seawater into WHO-standard potable drinking water using membrane filtration with electrical heating jackets."
}, {
  id: "eq-research",
  name: "Atmospheric LIDAR & Aerosol Spectrometer",
  station: "Bharati Station",
  stationId: "bharati",
  category: "Scientific Payload",
  status: "Normal",
  statusVariant: "normal",
  temperature: 19.2,
  vibration: "0.1 mm/s (Ultra-Low)",
  vibrationVal: 0.1,
  runtimeHours: 15400,
  mtbfHours: 22000,
  healthPercent: 95,
  lastMaint: "10 days ago",
  nextMaint: "20 days remaining",
  spec: "Pulsed Nd:YAG 532/1064nm Dual-Wavelength Polar LIDAR",
  oilPressureBar: 0.0,
  fuelConsumptionLph: 0.0,
  coolantLevelPct: 100,
  desc: "Vertical atmospheric laser sounder measuring polar stratospheric clouds (PSCs) and ozone depletion chemistry over Larsemann Hills."
}, {
  id: "eq-maitri-water",
  name: "Lake Priyadarshini Sub-Ice Meltwater Pump",
  station: "Maitri Station",
  stationId: "maitri",
  category: "Life Support",
  status: "Normal",
  statusVariant: "normal",
  temperature: 4.2,
  vibration: "1.4 mm/s (Nominal)",
  vibrationVal: 1.4,
  runtimeHours: 9200,
  mtbfHours: 15000,
  healthPercent: 92,
  lastMaint: "11 days ago",
  nextMaint: "19 days remaining",
  spec: "Heated Submersible Intake Pump & Trace Pipeline (3,200 L/Day)",
  oilPressureBar: 0.0,
  fuelConsumptionLph: 0.0,
  coolantLevelPct: 97,
  desc: "Supplies freshwater extracted from sub-surface layers of Lake Priyadarshini through a 2.5 km heated conduit line to Maitri living quarters."
}];

// --- data/alertsData.js ---
// Antarctic Digital Twin - Operational Alerts & Incident Log
// National Centre for Polar and Ocean Research (NCPOR)

const INITIAL_ALERTS = [{
  id: "ALT-2026-081",
  station: "Bharati Station",
  stationId: "bharati",
  zoneId: "battery_room",
  equipment: "Station LiFePO4 Energy Storage Buffer",
  parameter: "Discharge Rate Gradient",
  severity: "WARNING",
  timestamp: "2026-09-24 04:12:18 UTC",
  status: "Active",
  summary: "Battery discharge rate increasing above expected nocturnal baseline (+14.2% over target).",
  rootCause: "Potential parasitic drain from auxiliary heated water conduit in corridor B-2.",
  sopAction: "Audit auxiliary electrical heating circuits, check branch breaker #14, and verify solar charge regulator status.",
  acknowledged: false,
  resolved: false
}, {
  id: "ALT-2026-079",
  station: "Maitri Station",
  stationId: "maitri",
  zoneId: "fuel_storage",
  equipment: "Polar Diesel & ATF Fuel Bladders",
  parameter: "Fuel Reserve Winter Threshold",
  severity: "WARNING",
  timestamp: "2026-09-23 19:45:00 UTC",
  status: "Active",
  summary: "Active fuel storage level reached 64.2% (approaching winter safety reserve threshold of 60%).",
  rootCause: "Continuous polar night baseline heating consumption during recent gale storm.",
  sopAction: "Initiate fuel transfer from secondary reserve storage bladder #3. Verify trace-heating line continuity.",
  acknowledged: true,
  resolved: false
}, {
  id: "ALT-2026-074",
  station: "Bharati Station",
  stationId: "bharati",
  zoneId: "generator_room",
  equipment: "Diesel Generator 01 (Primary Base-Load)",
  parameter: "Exhaust Backpressure Differential",
  severity: "INFO",
  timestamp: "2026-09-22 11:20:30 UTC",
  status: "Acknowledged",
  summary: "Routine particulate filter delta-pressure reading slightly elevated (12 mbar vs 8 mbar nominal).",
  rootCause: "Normal carbon accumulation after 4,200 continuous run-hours.",
  sopAction: "Schedule soot trap cleaning and exhaust valve clearance check during next maintenance window.",
  acknowledged: true,
  resolved: false
}, {
  id: "ALT-2026-068",
  station: "Bharati Station",
  stationId: "bharati",
  zoneId: "communication_room",
  equipment: "NRSC Earth Observation Ground Station Radome",
  parameter: "De-icing Heating Loop",
  severity: "NORMAL",
  timestamp: "2026-09-21 08:00:15 UTC",
  status: "Resolved",
  summary: "Radome rim de-icing cycle successfully completed. Rime ice accumulation cleared.",
  rootCause: "Automated humidity-triggered heater activation.",
  sopAction: "System auto-restored to low-power standby mode.",
  acknowledged: true,
  resolved: true
}];

// --- data/logisticsData.js ---
// Antarctic Digital Twin - Logistics, Supply Chain & Polar Expedition Data
// National Centre for Polar and Ocean Research (NCPOR), Goa

const LOGISTICS_DATA = [{
  item: "Polar Grade Aviation Kerosene / Diesel (Jet A-1)",
  category: "Fuel & Energy",
  currentStock: "46,200 L (58%)",
  stockPct: 58,
  requiredStock: "80,000 L (Target Capacity)",
  dailyBurn: "1,350 L/day",
  daysRemaining: 34,
  status: "Normal",
  resupplyPriority: "High",
  resupplyWindow: "November 2026 (Austral Summer Voyage)",
  notes: "Sufficient margin for current wintering crew. Resupply bunker transfer pre-approved."
}, {
  item: "Expedition Medical Supplies & Emergency Trauma Buffer",
  category: "Life Sustenance",
  currentStock: "42% capacity",
  stockPct: 42,
  requiredStock: "100% capacity",
  dailyBurn: "Periodic",
  daysRemaining: 21,
  status: "Warning",
  resupplyPriority: "Critical",
  resupplyWindow: "Priority Air Drop / Early Vessel Arrival",
  notes: "Injectable analgesics and specialized hyperbaric freeze kits below ideal safety cushion."
}, {
  item: "Deep-Freeze Long-Term Food Provisions",
  category: "Provisions",
  currentStock: "180 days ration",
  stockPct: 82,
  requiredStock: "220 days ration",
  dailyBurn: "Standard 28-crew allocation",
  daysRemaining: 180,
  status: "Normal",
  resupplyPriority: "Low",
  resupplyWindow: "Scheduled Summer Resupply",
  notes: "High nutritional grade dry pulses, grains, freeze-dried meats and canned reserves."
}, {
  item: "Volvo Penta Generator Filters & Injector Nozzle Kits",
  category: "Engineering Spares",
  currentStock: "6 sets (50%)",
  stockPct: 50,
  requiredStock: "12 sets",
  dailyBurn: "On scheduled 500-hour service",
  daysRemaining: 45,
  status: "Warning",
  resupplyPriority: "High",
  resupplyWindow: "Incoming Vessel Manifest",
  notes: "Required for major 5,000-hour planned overhaul before next wintering team arrives."
}, {
  item: "LiFePO4 Replacement Cells (50Ah Prismatic)",
  category: "Electrical Hardware",
  currentStock: "8 modules (65%)",
  stockPct: 65,
  requiredStock: "12 modules",
  dailyBurn: "Zero (Standby)",
  daysRemaining: 90,
  status: "Normal",
  resupplyPriority: "Medium",
  resupplyWindow: "Scheduled Vessel Cargo",
  notes: "Cold storage buffer for battery rack cell balancing."
}, {
  item: "LIDAR Spectrometer Pure Argon & Helium Carrier Gas",
  category: "Scientific Consumables",
  currentStock: "14 cylinders (70%)",
  stockPct: 70,
  requiredStock: "20 cylinders",
  dailyBurn: "Continuous trace flow",
  daysRemaining: 110,
  status: "Normal",
  resupplyPriority: "Medium",
  resupplyWindow: "Scheduled Vessel Cargo",
  notes: "Supports uninterrupted year-round upper atmosphere and ozone layer profiling."
}];
const EXPEDITION_VESSEL = {
  vesselName: "MV Vasiliy Golovnin (Chartered Polar Research Vessel)",
  voyageNumber: "45-ISE-2026",
  originPort: "Mormugao Port Trust (Goa, India)",
  destinationPort: "Larsemann Hills (Bharati Station) & Schirmacher Oasis (Maitri)",
  voyageStatus: "In Transit - Approaching Roaring Forties",
  currentCoordinates: "44°18′S 68°42′E",
  speedKnots: 13.8,
  distanceToPrydzBayNm: 1520,
  etaPrydzBay: "2026-10-18 14:00 UTC",
  iceClass: "DNV 1A Icebreaker",
  cargoManifest: {
    polarFuelLitres: 1200000,
    dryProvisionsTons: 140,
    scientificPayloadTons: 65,
    heavyMachinery: "2x PistenBully 300 Polar Tracked Vehicles + 1x Snowblower"
  }
};

// --- components/DigitalTwin3D.js ---
// Antarctic Digital Twin - Photorealistic 3D Visualization Engine
// Built with Three.js (r128+) & OrbitControls
// NCPOR Bharati & Maitri Research Stations

function DigitalTwin3D({
  station,
  selectedZone,
  onSelectZone,
  lightingMode,
  setLightingMode,
  isSnowing,
  setIsSnowing
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationRef = useRef(null);
  const interactiveMeshesRef = useRef([]);
  const hoveredMeshRef = useRef(null);
  const auroraMeshRef = useRef(null);
  const snowParticlesRef = useRef(null);
  const anemometerRef = useRef(null);
  const lightsRef = useRef({});
  const [activePreset, setActivePreset] = useState("overview");
  const [hudCollapsed, setHudCollapsed] = useState(false);

  // Camera presets for Bharati & Maitri
  const cameraPresets = {
    overview: {
      pos: [48, 32, 54],
      target: [0, 6, 0]
    },
    habitat: {
      pos: [0, 16, 26],
      target: [0, 8, 0]
    },
    power: {
      pos: [-22, 10, -6],
      target: [-14, 4, -2]
    },
    radome: {
      pos: [8, 22, 12],
      target: [0, 14, 0]
    },
    fuel: {
      pos: [-32, 12, 18],
      target: [-20, 3, 8]
    },
    helipad: {
      pos: [26, 12, 28],
      target: [18, 3, 14]
    }
  };

  // Smooth camera tween
  const tweenCamera = useCallback((targetPos, targetLookAt, duration = 1000) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const startPos = cameraRef.current.position.clone();
    const startTarget = controlsRef.current.target.clone();
    const endPos = new THREE.Vector3(...targetPos);
    const endTarget = new THREE.Vector3(...targetLookAt);
    const startTime = performance.now();
    const updateTween = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      cameraRef.current.position.lerpVectors(startPos, endPos, ease);
      controlsRef.current.target.lerpVectors(startTarget, endTarget, ease);
      controlsRef.current.update();
      if (progress < 1) {
        requestAnimationFrame(updateTween);
      }
    };
    updateTween();
  }, []);
  const handleSelectPreset = key => {
    setActivePreset(key);
    const preset = cameraPresets[key];
    if (preset) {
      tweenCamera(preset.pos, preset.target, 900);
    }
  };
  const handleResetCamera = () => {
    handleSelectPreset("overview");
  };

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 1200);
    camera.position.set(48, 32, 54);
    cameraRef.current = camera;

    // 3. Renderer with PBR tone mapping & soft shadows
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls
    let controls = null;
    if (window.THREE && window.THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2.05; // Prevent camera from going beneath terrain
      controls.minDistance = 12;
      controls.maxDistance = 160;
      controls.target.set(0, 6, 0);
      controlsRef.current = controls;
    }

    // 5. Environmental Lighting System
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 0.6);
    scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.3);
    dirLight.position.set(38, 52, 28);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 180;
    const d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);
    const ambientLight = new THREE.AmbientLight(0x60a5fa, 0.35);
    scene.add(ambientLight);
    const stationGlowLight = new THREE.PointLight(0xfef08a, 0.0, 35);
    stationGlowLight.position.set(0, 8, 4);
    scene.add(stationGlowLight);
    lightsRef.current = {
      hemiLight,
      dirLight,
      ambientLight,
      stationGlowLight
    };

    // 6. Realistic Procedural Larsemann Hills Terrain
    const terrainGeo = new THREE.PlaneGeometry(240, 240, 64, 64);
    const posAttr = terrainGeo.attributes.position;
    // Add natural undulating Antarctic terrain with rocky knolls
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      // Distance from center
      const dist = Math.sqrt(vx * vx + vy * vy);
      let z = 0;
      // Background mountain ridges
      if (vy < -30) {
        z += Math.sin(vx * 0.08) * 8 + Math.cos(vy * 0.06) * 12 + Math.abs(vy * 0.25);
      }
      // Rocky knoll outcrop around station
      if (vx < -15 && vy > 10) {
        z += Math.cos(vx * 0.12) * 4.5 + Math.sin(vy * 0.1) * 3;
      }
      // Subtle wind drifts
      z += Math.sin(vx * 0.04 + vy * 0.05) * 1.5;
      posAttr.setZ(i, z);
    }
    terrainGeo.computeVertexNormals();
    const snowMat = new THREE.MeshStandardMaterial({
      color: 0xedf4fc,
      roughness: 0.75,
      metalness: 0.15,
      flatShading: false
    });
    const terrain = new THREE.Mesh(terrainGeo, snowMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    scene.add(terrain);

    // Granite Bedrock Outcrops (characteristic of Larsemann Hills & Schirmacher Oasis)
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.88,
      metalness: 0.12,
      flatShading: true
    });
    const createRockRidge = (x, y, z, sx, sy, sz, rx = 0) => {
      const geo = new THREE.DodecahedronGeometry(sy, 1);
      const mesh = new THREE.Mesh(geo, rockMat);
      mesh.position.set(x, y, z);
      mesh.scale.set(sx, sy, sz);
      mesh.rotation.x = rx;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
    };

    // Place natural granite nunatak boulders
    createRockRidge(-35, 2, -28, 4, 3.5, 3);
    createRockRidge(-24, 1.5, -34, 3, 2.5, 2.5);
    createRockRidge(32, 2.2, -32, 5, 4, 3.8);
    createRockRidge(45, 3.5, -15, 4.5, 4.2, 4);
    createRockRidge(-28, 1, 30, 3, 2, 2.5);
    createRockRidge(36, 1.5, 34, 3.5, 2.8, 3);

    // Distant Antarctic Mountain Backdrop
    for (let i = 0; i < 9; i++) {
      const mHeight = 28 + i % 3 * 10;
      const mRadius = 18 + i % 4 * 6;
      const coneGeo = new THREE.ConeGeometry(mRadius, mHeight, 6);
      const coneMat = new THREE.MeshStandardMaterial({
        color: 0x718eb0,
        roughness: 0.9,
        flatShading: true
      });
      const mountain = new THREE.Mesh(coneGeo, coneMat);
      mountain.position.set(-80 + i * 20 + Math.sin(i) * 10, mHeight / 2 - 4, -95 + Math.cos(i) * 15);
      mountain.castShadow = true;
      scene.add(mountain);
    }

    // 7. Interactive Subsystem Assembly
    interactiveMeshesRef.current = [];
    const stationGroup = new THREE.Group();
    scene.add(stationGroup);

    // Common High-Detail Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.65,
      roughness: 0.35
    });
    const steelStiltMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25
    });
    const windowGlassMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.82
    });
    const solarCellMat = new THREE.MeshStandardMaterial({
      color: 0x0f274a,
      metalness: 0.92,
      roughness: 0.12
    });

    // Helper to register interactive zone
    const registerZoneMesh = (mesh, zoneId, label) => {
      mesh.userData = {
        zoneId,
        label,
        originalColor: mesh.material.color.getHex()
      };
      interactiveMeshesRef.current.push(mesh);
    };

    // Stilt Support Piling Grid (24 stilts)
    for (let x = -8; x <= 8; x += 4) {
      for (let z = -6; z <= 6; z += 4) {
        // Concrete/steel footpad bolted to rock
        const padGeo = new THREE.CylinderGeometry(0.8, 1.0, 0.6, 8);
        const pad = new THREE.Mesh(padGeo, rockMat);
        pad.position.set(x, 0.3, z);
        stationGroup.add(pad);

        // Tubular steel column
        const stiltGeo = new THREE.CylinderGeometry(0.28, 0.28, 5.2, 12);
        const stilt = new THREE.Mesh(stiltGeo, steelStiltMat);
        stilt.position.set(x, 2.9, z);
        stilt.castShadow = true;
        stationGroup.add(stilt);
      }
    }

    // ZONE 1: Main Superstructure Habitat & Command
    const mainHullGeo = new THREE.BoxGeometry(18, 5.4, 13);
    const mainHull = new THREE.Mesh(mainHullGeo, titaniumMat.clone());
    mainHull.position.set(0, 8.2, 0);
    mainHull.castShadow = true;
    mainHull.receiveShadow = true;
    registerZoneMesh(mainHull, "main_building", "Main Habitat & Command");
    stationGroup.add(mainHull);

    // Aerodynamic beveled roof baffle
    const roofBaffleGeo = new THREE.BoxGeometry(18.4, 0.6, 13.4);
    const roofBaffle = new THREE.Mesh(roofBaffleGeo, steelStiltMat);
    roofBaffle.position.set(0, 11.0, 0);
    roofBaffle.castShadow = true;
    stationGroup.add(roofBaffle);

    // Panoramic Observation Galleria Windows (North face overlooking bay)
    const windowStrips = [-6, -2, 2, 6];
    windowStrips.forEach(x => {
      const winGeo = new THREE.BoxGeometry(3.2, 1.8, 0.3);
      const win = new THREE.Mesh(winGeo, windowGlassMat);
      win.position.set(x, 8.4, 6.55);
      stationGroup.add(win);
    });

    // Rooftop Solar Array (Angled towards polar summer sun)
    for (let r = -6; r <= 6; r += 4) {
      const solarGeo = new THREE.PlaneGeometry(3.4, 2.6);
      const solarMesh = new THREE.Mesh(solarGeo, solarCellMat);
      solarMesh.rotation.x = -Math.PI / 3;
      solarMesh.position.set(r, 11.8, -2.5);
      solarMesh.castShadow = true;
      stationGroup.add(solarMesh);
    }

    // ZONE 2: Generator & CHP Room
    const genGeo = new THREE.BoxGeometry(7.2, 4.6, 7.2);
    const genMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.7,
      roughness: 0.3
    });
    const genMesh = new THREE.Mesh(genGeo, genMat);
    genMesh.position.set(-14.5, 4.2, -2);
    genMesh.castShadow = true;
    registerZoneMesh(genMesh, "generator_room", "Power & Generator Shed");
    stationGroup.add(genMesh);

    // Dual Stainless Exhaust Muffler Stacks
    [-15.2, -13.8].forEach(x => {
      const stackGeo = new THREE.CylinderGeometry(0.2, 0.2, 4.5, 12);
      const stackMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.9,
        roughness: 0.1
      });
      const stack = new THREE.Mesh(stackGeo, stackMat);
      stack.position.set(x, 8.0, -2);
      stack.castShadow = true;
      stationGroup.add(stack);
    });

    // ZONE 3: Ocean & Atmospheric Laboratory (Forward Wing)
    const labGeo = new THREE.BoxGeometry(9, 4.5, 7.5);
    const labMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.5,
      roughness: 0.35
    });
    const labMesh = new THREE.Mesh(labGeo, labMat);
    labMesh.position.set(13.8, 7.8, 0);
    labMesh.castShadow = true;
    registerZoneMesh(labMesh, "laboratory", "Ocean & Atmo Laboratory");
    stationGroup.add(labMesh);

    // Enclosed connecting walkway between Main Habitat and Lab
    const bridgeGeo = new THREE.BoxGeometry(5, 3.2, 3.2);
    const bridgeMesh = new THREE.Mesh(bridgeGeo, titaniumMat);
    bridgeMesh.position.set(9.2, 7.6, 0);
    bridgeMesh.castShadow = true;
    stationGroup.add(bridgeMesh);

    // ZONE 4: Satellite Radome & Comms
    const radomeBaseGeo = new THREE.CylinderGeometry(2.4, 2.6, 1.2, 16);
    const radomeBase = new THREE.Mesh(radomeBaseGeo, steelStiltMat);
    radomeBase.position.set(0, 11.8, 2);
    stationGroup.add(radomeBase);
    const radomeGeo = new THREE.SphereGeometry(3.2, 24, 20);
    const radomeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.05
    });
    const radomeMesh = new THREE.Mesh(radomeGeo, radomeMat);
    radomeMesh.position.set(0, 15.0, 2);
    radomeMesh.castShadow = true;
    registerZoneMesh(radomeMesh, "communication_room", "Satellite Radome & Uplink");
    stationGroup.add(radomeMesh);

    // Satellite Dish Receiver Ring
    const dishGeo = new THREE.TorusGeometry(1.6, 0.08, 8, 24);
    const dishMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.8
    });
    const dish = new THREE.Mesh(dishGeo, dishMat);
    dish.rotation.x = Math.PI / 4;
    dish.position.set(0, 15.0, 2);
    stationGroup.add(dish);

    // ZONE 5: Provisions & Cryo Depot
    const storeGeo = new THREE.BoxGeometry(6, 4, 6);
    const storeMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.5,
      roughness: 0.4
    });
    const storeMesh = new THREE.Mesh(storeGeo, storeMat);
    storeMesh.position.set(-11, 2.5, 10);
    storeMesh.castShadow = true;
    registerZoneMesh(storeMesh, "storage", "Provisions & Cryo Depot");
    stationGroup.add(storeMesh);

    // ZONE 6: Fuel Tank Farm (Bunded Cylindrical Tanks)
    const bundGeo = new THREE.BoxGeometry(10.5, 0.8, 7.5);
    const bundMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.8
    });
    const bund = new THREE.Mesh(bundGeo, bundMat);
    bund.position.set(-20, 0.4, 8);
    bund.receiveShadow = true;
    stationGroup.add(bund);

    // Dual polar fuel storage cylinders
    [-22, -18].forEach(x => {
      const fuelGeo = new THREE.CylinderGeometry(1.9, 1.9, 4.8, 20);
      const fuelMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.7,
        roughness: 0.3
      });
      const fuelTank = new THREE.Mesh(fuelGeo, fuelMat);
      fuelTank.position.set(x, 2.8, 8);
      fuelTank.castShadow = true;
      registerZoneMesh(fuelTank, "fuel_storage", "Polar Fuel Storage Complex");
      stationGroup.add(fuelTank);
    });

    // ZONE 7: Battery Storage Room (550 kWh LiFePO4)
    const battGeo = new THREE.BoxGeometry(6, 3.8, 5);
    const battMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      metalness: 0.5,
      roughness: 0.3
    });
    const battMesh = new THREE.Mesh(battGeo, battMat);
    battMesh.position.set(7.5, 2.4, -11);
    battMesh.castShadow = true;
    registerZoneMesh(battMesh, "battery_room", "Station UPS & Battery Buffer");
    stationGroup.add(battMesh);

    // ZONE 8: Research Area & Meteorological Tower
    const mastGeo = new THREE.CylinderGeometry(0.12, 0.18, 16, 8);
    const mastMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      metalness: 0.85
    });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.set(18, 8.0, 8);
    mast.castShadow = true;
    registerZoneMesh(mast, "research_area", "Meteorological & LIDAR Mast");
    stationGroup.add(mast);

    // Spinning Anemometer on Mast Tip
    const anemometerGroup = new THREE.Group();
    anemometerGroup.position.set(18, 16.2, 8);
    for (let c = 0; c < 3; c++) {
      const armGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.0);
      const arm = new THREE.Mesh(armGeo, mastMat);
      arm.rotation.z = Math.PI / 2;
      arm.rotation.y = c * Math.PI * 2 / 3;
      anemometerGroup.add(arm);
      const cupGeo = new THREE.SphereGeometry(0.2, 8, 8, 0, Math.PI);
      const cup = new THREE.Mesh(cupGeo, steelStiltMat);
      cup.position.x = 0.5;
      cup.rotation.y = c * Math.PI * 2 / 3;
      anemometerGroup.add(cup);
    }
    scene.add(anemometerGroup);
    anemometerRef.current = anemometerGroup;

    // Helipad Platform on Stilts
    const heliGeo = new THREE.CylinderGeometry(7.2, 7.2, 0.6, 8);
    const heliMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.6
    });
    const helipad = new THREE.Mesh(heliGeo, heliMat);
    helipad.position.set(18, 2.6, 16);
    helipad.receiveShadow = true;
    helipad.castShadow = true;
    stationGroup.add(helipad);

    // Helipad "H" Marking & Ring
    const heliRingGeo = new THREE.RingGeometry(4.5, 4.8, 24);
    const heliRingMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      side: THREE.DoubleSide
    });
    const heliRing = new THREE.Mesh(heliRingGeo, heliRingMat);
    heliRing.rotation.x = -Math.PI / 2;
    heliRing.position.set(18, 2.92, 16);
    stationGroup.add(heliRing);

    // 8. Aurora Australis Overhead Curtain (Animated in Polar Night mode)
    const auroraGeo = new THREE.PlaneGeometry(280, 70, 32, 16);
    const auroraMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide
    });
    const auroraMesh = new THREE.Mesh(auroraGeo, auroraMat);
    auroraMesh.position.set(0, 75, -45);
    auroraMesh.rotation.x = Math.PI / 6;
    scene.add(auroraMesh);
    auroraMeshRef.current = auroraMesh;

    // 9. Snowfall Particle System
    const snowCount = 1600;
    const snowGeo = new THREE.BufferGeometry();
    const snowPos = new Float32Array(snowCount * 3);
    for (let i = 0; i < snowCount * 3; i += 3) {
      snowPos[i] = (Math.random() - 0.5) * 160;
      snowPos[i + 1] = Math.random() * 60;
      snowPos[i + 2] = (Math.random() - 0.5) * 160;
    }
    snowGeo.setAttribute("position", new THREE.BufferAttribute(snowPos, 3));
    const snowMatParticles = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.32,
      transparent: true,
      opacity: 0.8
    });
    const snowParticles = new THREE.Points(snowGeo, snowMatParticles);
    scene.add(snowParticles);
    snowParticlesRef.current = snowParticles;

    // 10. Raycasting & Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onPointerMove = e => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current, false);
      if (intersects.length > 0) {
        const topMesh = intersects[0].object;
        if (hoveredMeshRef.current !== topMesh) {
          if (hoveredMeshRef.current && hoveredMeshRef.current.material.emissive) {
            hoveredMeshRef.current.material.emissive.setHex(0x000000);
          }
          hoveredMeshRef.current = topMesh;
          if (topMesh.material.emissive) {
            topMesh.material.emissive.setHex(0x0369a1);
          }
          renderer.domElement.style.cursor = "pointer";
        }
      } else {
        if (hoveredMeshRef.current && hoveredMeshRef.current.material.emissive) {
          hoveredMeshRef.current.material.emissive.setHex(0x000000);
        }
        hoveredMeshRef.current = null;
        renderer.domElement.style.cursor = "default";
      }
    };
    const onPointerDown = e => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current, false);
      if (intersects.length > 0) {
        const zoneId = intersects[0].object.userData.zoneId;
        const targetZone = station.zones.find(z => z.id === zoneId);
        if (targetZone) {
          onSelectZone(targetZone);
          // Gently focus camera towards clicked object
          const pos = intersects[0].object.position;
          tweenCamera([pos.x + 16, pos.y + 12, pos.z + 20], [pos.x, pos.y + 1, pos.z], 700);
        }
      }
    };
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    // 11. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      if (controls) controls.update();

      // Spin anemometer based on wind speed
      if (anemometerRef.current) {
        anemometerRef.current.rotation.y += delta * (station.environment.windSpeed * 0.12);
      }

      // Snow particle drift
      if (isSnowing && snowParticlesRef.current) {
        const positions = snowParticlesRef.current.geometry.attributes.position.array;
        for (let i = 1; i < snowCount * 3; i += 3) {
          positions[i] -= delta * 9.0;
          positions[i - 1] += delta * 4.0; // Wind drift SE
          if (positions[i] < 0) {
            positions[i] = 58;
            positions[i - 1] = (Math.random() - 0.5) * 160;
          }
        }
        snowParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Undulating Aurora Australis waves
      if (auroraMeshRef.current && auroraMeshRef.current.material.opacity > 0.05) {
        const aGeo = auroraMeshRef.current.geometry;
        const pos = aGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const vx = pos.getX(i);
          pos.setZ(i, Math.sin(vx * 0.05 + elapsed * 1.8) * 8 + Math.cos(elapsed * 1.2) * 4);
        }
        pos.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      if (controls) controls.dispose();
      renderer.dispose();
      container.innerHTML = "";
    };
  }, [station.id]);

  // Handle Dynamic Lighting Mode Changes
  useEffect(() => {
    if (!sceneRef.current || !lightsRef.current.dirLight) return;
    const scene = sceneRef.current;
    const {
      hemiLight,
      dirLight,
      ambientLight,
      stationGlowLight
    } = lightsRef.current;
    if (lightingMode === "day") {
      scene.background = new THREE.Color(0x0c1e38);
      scene.fog = new THREE.FogExp2(0x0c1e38, 0.008);
      dirLight.color.setHex(0xfffdf5);
      dirLight.intensity = 1.35;
      dirLight.position.set(38, 52, 28);
      hemiLight.color.setHex(0xdbeafe);
      hemiLight.groundColor.setHex(0x1e293b);
      hemiLight.intensity = 0.6;
      ambientLight.intensity = 0.35;
      stationGlowLight.intensity = 0.0;
      if (auroraMeshRef.current) auroraMeshRef.current.material.opacity = 0.0;
    } else if (lightingMode === "twilight") {
      scene.background = new THREE.Color(0x181735);
      scene.fog = new THREE.FogExp2(0x181735, 0.012);
      dirLight.color.setHex(0xf59e0b); // Golden polar dusk
      dirLight.intensity = 1.05;
      dirLight.position.set(55, 14, 25);
      hemiLight.color.setHex(0xc084fc);
      hemiLight.groundColor.setHex(0x0f172a);
      hemiLight.intensity = 0.45;
      ambientLight.intensity = 0.25;
      stationGlowLight.intensity = 1.2;
      if (auroraMeshRef.current) auroraMeshRef.current.material.opacity = 0.15;
    } else if (lightingMode === "night") {
      scene.background = new THREE.Color(0x020617); // Deep polar night
      scene.fog = new THREE.FogExp2(0x040817, 0.014);
      dirLight.color.setHex(0x38bdf8); // Moonlight
      dirLight.intensity = 0.28;
      dirLight.position.set(-25, 40, -20);
      hemiLight.color.setHex(0x064e3b);
      hemiLight.groundColor.setHex(0x020617);
      hemiLight.intensity = 0.3;
      ambientLight.intensity = 0.15;
      stationGlowLight.intensity = 2.5; // Windows radiate warm light
      if (auroraMeshRef.current) auroraMeshRef.current.material.opacity = 0.85; // Vibrant Aurora Australis
    }
  }, [lightingMode]);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "viewport-container",
    ref: mountRef
  }), selectedZone && /*#__PURE__*/React.createElement("div", {
    className: `hud-panel p-4 transition-all duration-300 ${hudCollapsed ? 'opacity-90' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-700/60 pb-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-xs uppercase font-mono tracking-wider text-sky-400 font-semibold"
  }, selectedZone.subsystem || "Station Subsystem"), /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold text-white leading-tight mt-0.5"
  }, selectedZone.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setHudCollapsed(!hudCollapsed),
    className: "text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 text-xs font-mono",
    title: "Toggle HUD detail"
  }, hudCollapsed ? "EXPAND" : "MIN")), !hudCollapsed && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between py-1 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Operational Status"), /*#__PURE__*/React.createElement("span", {
    className: `badge ${selectedZone.status === "Normal" ? "badge-normal" : "badge-warning"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `status-dot ${selectedZone.status === "Normal" ? "normal" : "warning"}`
  }), selectedZone.status)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-2.5 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Core Temp"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-bold font-mono text-white"
  }, selectedZone.temp > 0 ? `+${selectedZone.temp}` : selectedZone.temp, "\xB0C")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-2.5 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Power Load"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-bold font-mono text-sky-400"
  }, selectedZone.powerKw, " kW"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-2.5 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-[11px]"
  }, "Subsystem Health"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-emerald-400 font-bold"
  }, selectedZone.health, "%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-500 h-full rounded-full transition-all duration-500",
    style: {
      width: `${selectedZone.health}%`
    }
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-300 text-[11px] leading-relaxed bg-slate-950/40 p-2 rounded border border-slate-800/80"
  }, selectedZone.desc), /*#__PURE__*/React.createElement("div", {
    className: "pt-1 flex items-center justify-between text-[11px] text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "Last Inspection: ", selectedZone.lastMaint), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-sky-400 cursor-pointer hover:underline",
    onClick: () => handleSelectPreset("overview")
  }, "Center View")))), /*#__PURE__*/React.createElement("div", {
    className: "hud-controls-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 border-r border-slate-700/80 pr-2 mr-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] uppercase tracking-wider text-slate-400 font-semibold px-1 hidden sm:inline"
  }, "Camera:"), [{
    id: "overview",
    label: "Overview"
  }, {
    id: "habitat",
    label: "Habitat"
  }, {
    id: "power",
    label: "Power"
  }, {
    id: "radome",
    label: "Radome"
  }, {
    id: "fuel",
    label: "Fuel"
  }, {
    id: "helipad",
    label: "Helipad"
  }].map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    onClick: () => handleSelectPreset(p.id),
    className: `px-2.5 py-1 text-xs rounded transition-colors ${activePreset === p.id ? "bg-blue-600 text-white font-medium" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`
  }, p.label)), /*#__PURE__*/React.createElement("button", {
    onClick: handleResetCamera,
    className: "px-2 py-1 text-xs text-slate-400 hover:text-white rounded hover:bg-slate-800",
    title: "Reset default view"
  }, "\u21BA")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 border-r border-slate-700/80 pr-2 mr-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] uppercase tracking-wider text-slate-400 font-semibold px-1 hidden sm:inline"
  }, "Atmosphere:"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLightingMode("day"),
    className: `px-2 py-1 text-xs rounded flex items-center gap-1 ${lightingMode === "day" ? "bg-sky-500/20 text-sky-300 border border-sky-500/40" : "text-slate-400 hover:text-white"}`,
    title: "Austral Summer Polar Day"
  }, "\u2600\uFE0F Day"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLightingMode("twilight"),
    className: `px-2 py-1 text-xs rounded flex items-center gap-1 ${lightingMode === "twilight" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-slate-400 hover:text-white"}`,
    title: "Polar Twilight Dusk"
  }, "\uD83C\uDF05 Twilight"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLightingMode("night"),
    className: `px-2 py-1 text-xs rounded flex items-center gap-1 ${lightingMode === "night" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "text-slate-400 hover:text-white"}`,
    title: "Polar Night with Aurora Australis"
  }, "\uD83C\uDF0C Aurora")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsSnowing(!isSnowing),
    className: `px-2.5 py-1 text-xs rounded transition-colors ${isSnowing ? "text-sky-300 bg-sky-950/60 border border-sky-800/60" : "text-slate-400 hover:text-white"}`,
    title: "Toggle polar snow precipitation"
  }, "\u2744\uFE0F ", isSnowing ? "Snow Active" : "Clear Sky")));
}

// --- components/Header.js ---
// Antarctic Digital Twin - Master Product Header & Mission Status Bar
// National Centre for Polar and Ocean Research (NCPOR)

function Header({
  currentStation,
  onStationChange,
  stations,
  userRole,
  onRoleChange,
  satelliteOnline,
  onToggleSatellite,
  bufferedCount,
  onQuickSimulate
}) {
  const [utcTime, setUtcTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  const activeStation = stations[currentStation];
  return /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 lg:px-6 py-2.5 transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 w-full md:w-auto justify-between md:justify-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-lg shadow-sm"
  }, "\u2744\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-sm tracking-tight text-white uppercase"
  }, "POLAR-TWIN"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/60 font-semibold"
  }, "NCPOR \u2022 MoES")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 font-medium"
  }, "Remote Operations & Telemetry Command"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5 shadow-sm"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onStationChange("bharati"),
    className: `px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${currentStation === "bharati" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `status-dot ${currentStation === "bharati" ? "normal" : "offline"}`
  }), "Bharati"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onStationChange("maitri"),
    className: `px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${currentStation === "maitri" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `status-dot ${currentStation === "maitri" ? "normal" : "offline"}`
  }), "Maitri"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-end gap-3 w-full md:w-auto text-xs"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggleSatellite,
    className: `px-2.5 py-1.5 rounded-lg border flex items-center gap-2 transition-all ${satelliteOnline ? "bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500" : "bg-amber-950/40 border-amber-600/60 text-amber-300"}`,
    title: "Click to toggle high-latitude satellite communication link simulation"
  }, /*#__PURE__*/React.createElement("span", {
    className: `status-dot ${satelliteOnline ? "normal" : "warning"}`
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-left font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "block text-[10px] text-slate-400 leading-none"
  }, satelliteOnline ? "GSAT-14 Uplink" : "Store & Forward"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-[11px]"
  }, satelliteOnline ? "480ms (Active)" : `Offline (${bufferedCount} pkts)`))), /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex items-center gap-1 bg-slate-900 border border-slate-700/80 px-2 py-1 rounded-lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] uppercase tracking-wider text-slate-400 font-semibold mr-1"
  }, "Role:"), /*#__PURE__*/React.createElement("select", {
    value: userRole,
    onChange: e => onRoleChange(e.target.value),
    className: "bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
  }, /*#__PURE__*/React.createElement("option", {
    value: "NCPOR Administrator",
    className: "bg-slate-900 text-slate-200"
  }, "NCPOR Admin (HQ)"), /*#__PURE__*/React.createElement("option", {
    value: "Station Field Engineer",
    className: "bg-slate-900 text-slate-200"
  }, "Station Engineer"), /*#__PURE__*/React.createElement("option", {
    value: "Mission Logistics Planner",
    className: "bg-slate-900 text-slate-200"
  }, "Expedition Planner"))), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:flex flex-col items-end font-mono text-[11px] text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] uppercase tracking-wider text-slate-400 font-semibold"
  }, "Polar Station Time"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-200 font-semibold"
  }, utcTime || "2026-09-25 10:15:00 UTC")), /*#__PURE__*/React.createElement("button", {
    onClick: onQuickSimulate,
    className: "btn-primary text-xs py-1.5 px-3",
    title: "Inject real-time thermal fault into primary diesel generator to demonstrate predictive AI"
  }, "\u26A1 Test Bench"))));
}

// --- components/Navigation.js ---
// Antarctic Digital Twin - Product Navigation Bar
// National Centre for Polar and Ocean Research (NCPOR)

function Navigation({
  activeTab,
  onTabChange,
  alertCount,
  offlineBufferedCount
}) {
  const navItems = [{
    id: "overview",
    label: "Overview",
    icon: "📊",
    badge: null
  }, {
    id: "3d-twin",
    label: "3D Digital Twin",
    icon: "🌐",
    badge: "LIVE"
  }, {
    id: "telemetry",
    label: "Telemetry",
    icon: "⚡",
    badge: null
  }, {
    id: "diagnostics",
    label: "Predictive AI",
    icon: "🧠",
    badge: "ANOMALY"
  }, {
    id: "alerts",
    label: "Alerts & Events",
    icon: "🔔",
    badge: alertCount > 0 ? alertCount : null,
    alert: alertCount > 0
  }, {
    id: "logistics",
    label: "Logistics & Fleet",
    icon: "🚢",
    badge: null
  }, {
    id: "architecture",
    label: "Edge Sync",
    icon: "🛰️",
    badge: offlineBufferedCount > 0 ? `${offlineBufferedCount}` : null
  }, {
    id: "about",
    label: "About NCPOR",
    icon: "ℹ️",
    badge: null
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: "w-full bg-slate-950/70 border-b border-slate-800/80 px-4 lg:px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none"
  }, navItems.map(item => {
    const isActive = activeTab === item.id;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      onClick: () => onTabChange(item.id),
      className: `px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${isActive ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm"
    }, item.icon), /*#__PURE__*/React.createElement("span", null, item.label), item.badge && /*#__PURE__*/React.createElement("span", {
      className: `text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold uppercase ${item.alert ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-slate-800 text-slate-300 border border-slate-700"}`
    }, item.badge));
  })));
}

// --- components/OverviewView.js ---
// Antarctic Digital Twin - Executive Overview & Mission Control Dashboard
// National Centre for Polar and Ocean Research (NCPOR)

function OverviewView({
  station,
  onNavigate,
  onSelectZone
}) {
  const env = station.environment;
  const energy = station.energy;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 view-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-6 bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/30 border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-normal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-dot normal"
  }), station.status), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-slate-400"
  }, "Code: ", station.code, " \u2022 Lat/Lon: ", station.coordinates)), /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl lg:text-3xl font-extrabold text-white tracking-tight"
  }, station.name), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed"
  }, station.tagline, " Located at ", station.location, " (", station.elevation, ").")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-950/60 border border-slate-800 px-4 py-2 rounded-lg text-center font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 uppercase tracking-wider block font-semibold"
  }, "Station Crew"), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-bold text-white"
  }, station.currentCrew, " / ", station.winteringCapacity), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-emerald-400 block font-sans"
  }, "Wintering Team")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-950/60 border border-slate-800 px-4 py-2 rounded-lg text-center font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 uppercase tracking-wider block font-semibold"
  }, "Station Health Index"), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-bold text-emerald-400"
  }, station.healthScore, "%"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-sans"
  }, "Condition Green")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("3d-twin"),
    className: "btn-primary"
  }, "\uD83C\uDF10 Open 3D Twin")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "Station Grid Load"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-blue-400"
  }, (energy.currentConsumptionKw / energy.totalGenerationKw * 100).toFixed(0), "% Utilized")), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, energy.currentConsumptionKw, " ", /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-normal text-slate-400"
  }, "/ ", energy.totalGenerationKw, " kW")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1 mb-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-500 h-full rounded-full",
    style: {
      width: `${energy.currentConsumptionKw / energy.totalGenerationKw * 100}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, energy.generatorStatus)), /*#__PURE__*/React.createElement("div", {
    className: "vital-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "Polar Fuel Reserve"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-amber-400"
  }, energy.fuelLevelPercent, "% Cap")), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, energy.estimatedRuntimeDays, " ", /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-normal text-slate-400"
  }, "Days Runtime")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1 mb-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-500 h-full rounded-full",
    style: {
      width: `${energy.fuelLevelPercent}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, energy.fuelLitres.toLocaleString(), " L remaining (", energy.dailyBurnLitres, " L/day burn)")), /*#__PURE__*/React.createElement("div", {
    className: "vital-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "LiFePO4 UPS Buffer"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-emerald-400"
  }, energy.batterySocPercent, "% SoC")), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, (energy.batterySocPercent / 100 * energy.batteryCapacityKwh).toFixed(0), " ", /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-normal text-slate-400"
  }, "/ ", energy.batteryCapacityKwh, " kWh")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1 mb-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-500 h-full rounded-full",
    style: {
      width: `${energy.batterySocPercent}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, "Bus Voltage: ", energy.batteryVoltage, "V \u2022 Standby Buffer")), /*#__PURE__*/React.createElement("div", {
    className: "vital-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "Habitat Thermal Delta"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-sky-400"
  }, "\u0394 ", Math.abs(21.2 - env.temperature).toFixed(1), "\xB0C")), /*#__PURE__*/React.createElement("div", {
    className: "value text-white"
  }, "+21.2\xB0C", " ", /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-normal text-slate-400"
  }, "vs ", env.temperature, "\xB0C Outside")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1 mb-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-sky-400 h-full rounded-full",
    style: {
      width: `${energy.heatRecoveryEfficiency}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, "CHP Heat Recovery Efficiency: ", energy.heatRecoveryEfficiency, "%"))), /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-5 border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-base font-bold text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF26\uFE0F"), " Antarctic Meteorology & Katabatic Wind Monitoring"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Calibrated ultrasonic weather sensor mast at ", station.name)), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-slate-400"
  }, "Synoptic Station: ", station.code, " \u2022 Sensor Mast Online")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Air Temperature"), /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-bold font-mono text-white mt-0.5 block"
  }, env.temperature, "\xB0C"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "Feels Like ", env.feelsLike, "\xB0C")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Wind Speed"), /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-bold font-mono text-sky-400 mt-0.5 block"
  }, env.windSpeed, " km/h"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "Gusts: ", env.windGust, " km/h")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Wind Direction"), /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-bold font-mono text-white mt-0.5 block"
  }, env.windDirection), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "Inland Katabatic")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Barometer"), /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-bold font-mono text-white mt-0.5 block"
  }, env.pressure, " hPa"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-emerald-400"
  }, "Steady Polar Low")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Optical Visibility"), /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-bold font-mono text-white mt-0.5 block"
  }, env.visibility, " km"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "Clear Horizon")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Precipitation"), /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-bold font-mono text-white mt-0.5 block"
  }, env.snowfall.split(' ')[0]), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, env.snowfall))), env.katabaticAdvisory && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 p-2.5 rounded bg-blue-950/30 border border-blue-900/40 text-xs text-blue-200 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\u2139\uFE0F"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Katabatic Advisory:"), " ", env.katabaticAdvisory))), /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-5 border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-base font-bold text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFD7\uFE0F"), " Subsystem Operational Matrix"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Interactive health matrix of all active modules at ", station.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("3d-twin"),
    className: "text-xs text-blue-400 hover:text-blue-300 font-semibold"
  }, "View in 3D Model \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
  }, station.zones.map(zone => /*#__PURE__*/React.createElement("div", {
    key: zone.id,
    onClick: () => {
      onSelectZone(zone);
      onNavigate("3d-twin");
    },
    className: "bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 p-3.5 rounded-lg cursor-pointer transition-all group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold"
  }, zone.subsystem), /*#__PURE__*/React.createElement("span", {
    className: `badge ${zone.status === "Normal" ? "badge-normal" : "badge-warning"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `status-dot ${zone.status === "Normal" ? "normal" : "warning"}`
  }), zone.status)), /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1"
  }, zone.name), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 mt-3 text-xs font-mono"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-sans"
  }, "Temp"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-200"
  }, zone.temp > 0 ? `+${zone.temp}` : zone.temp, "\xB0C")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-sans"
  }, "Power"), /*#__PURE__*/React.createElement("span", {
    className: "text-sky-400"
  }, zone.powerKw, " kW"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "Health: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-emerald-400 font-mono"
  }, zone.health, "%")), /*#__PURE__*/React.createElement("span", {
    className: "text-blue-400 group-hover:translate-x-0.5 transition-transform text-xs font-semibold"
  }, "Inspect \u2192")))))));
}

// --- components/TelemetryView.js ---
// Antarctic Digital Twin - Live Telemetry & Subsystem Monitoring
// National Centre for Polar and Ocean Research (NCPOR)

function TelemetryView({
  station
}) {
  const [timeRange, setTimeRange] = useState("24h");
  const energy = station.energy;
  const env = station.environment;

  // Power load breakdown calculations
  const totalLoad = energy.currentConsumptionKw;
  const loads = energy.loads;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 view-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-extrabold text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\u26A1"), " Subsystem Telemetry & Microgrid Monitoring"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-0.5"
  }, "Calibrated real-time sensor streams from ", station.name, " SCADA edge bus")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5 self-start sm:self-auto"
  }, ["1h", "6h", "24h", "7d"].map(range => /*#__PURE__*/React.createElement("button", {
    key: range,
    onClick: () => setTimeRange(range),
    className: `px-3 py-1 text-xs font-semibold rounded-md transition-all ${timeRange === range ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"}`
  }, range)))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 card-panel p-5 border-slate-800 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-800/80 pb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-sm font-bold text-white uppercase tracking-wider"
  }, "Microgrid Power Balance (", timeRange, ")"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "Primary Base-Load Generator + LiFePO4 Storage Buffer + Solar PV")), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-normal font-mono"
  }, "Bus Nominal: 400V / 50Hz")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3.5 rounded-lg border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400 uppercase tracking-wider block font-semibold"
  }, "Total Generation"), /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold font-mono text-white mt-1 block"
  }, energy.totalGenerationKw, " ", /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-sans text-slate-400 font-normal"
  }, "kW")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-emerald-400"
  }, "DG-01: 82 kW \u2022 Solar: 13 kW")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3.5 rounded-lg border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400 uppercase tracking-wider block font-semibold"
  }, "Station Active Demand"), /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold font-mono text-blue-400 mt-1 block"
  }, energy.currentConsumptionKw, " ", /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-sans text-slate-400 font-normal"
  }, "kW")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "Reserve Headroom: ", (energy.totalGenerationKw - energy.currentConsumptionKw).toFixed(1), " kW")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3.5 rounded-lg border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400 uppercase tracking-wider block font-semibold"
  }, "Battery Net Flow"), /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold font-mono text-emerald-400 mt-1 block"
  }, "+4.2 ", /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-sans text-slate-400 font-normal"
  }, "kW")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-emerald-400"
  }, "Charging (Float Mode)"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pt-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-semibold text-slate-300 uppercase tracking-wider"
  }, "Electrical Load Allocation by Subsystem"), [{
    label: "Heating & Thermal Life Support",
    kw: loads.heating_life_support,
    color: "bg-amber-500",
    pct: (loads.heating_life_support / totalLoad * 100).toFixed(1)
  }, {
    label: "Scientific Payload & Oceanographic Lab",
    kw: loads.research_equipment,
    color: "bg-blue-500",
    pct: (loads.research_equipment / totalLoad * 100).toFixed(1)
  }, {
    label: "Earth Station Satellite Ground Terminal",
    kw: loads.communications,
    color: "bg-sky-400",
    pct: (loads.communications / totalLoad * 100).toFixed(1)
  }, {
    label: "Analytical Laboratories & Clean Rooms",
    kw: loads.laboratory,
    color: "bg-indigo-500",
    pct: (loads.laboratory / totalLoad * 100).toFixed(1)
  }, {
    label: "Habitat Architecture & Perimeter Lighting",
    kw: loads.lighting,
    color: "bg-slate-400",
    pct: (loads.lighting / totalLoad * 100).toFixed(1)
  }, {
    label: "Emergency Life Support & UPS Backup",
    kw: loads.emergency_systems,
    color: "bg-rose-500",
    pct: (loads.emergency_systems / totalLoad * 100).toFixed(1)
  }].map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-300 font-medium"
  }, item.label), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-slate-300"
  }, item.kw, " kW ", /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500"
  }, "(", item.pct, "%)"))), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-800 h-2 rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: `${item.color} h-full rounded-full transition-all duration-500`,
    style: {
      width: `${item.pct}%`
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-5 border-slate-800 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-800/80 pb-3"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-sm font-bold text-white uppercase tracking-wider"
  }, "Hydronic Heat Recovery Loop"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "Waste engine heat converted for station heating")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-lg bg-slate-900/60 border border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Heat Exchanger Supply (Primary)"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-amber-400"
  }, "+64.0\xB0C")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "50/50 Propylene Glycol circuit")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-lg bg-slate-900/60 border border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Hydronic Return Temperature"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-sky-400"
  }, "+48.2\xB0C")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "Habitat heat dissipation delta: \u0394 15.8\xB0C")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-lg bg-slate-900/60 border border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Glycol Circulation Flow"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-white"
  }, "68.5 L/min")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-emerald-400"
  }, "Twin Grundfos CR-5 pumps normal")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-lg bg-slate-900/60 border border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Freshwater RO Production"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-white"
  }, "3,850 L / Day")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "Trace heating maintaining marine intake at +4.0\xB0C"))))), /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-5 border-slate-800 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-800/80 pb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-sm font-bold text-white uppercase tracking-wider"
  }, "24-Hour Continuous Telemetry Trendlines"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "Normalized historical readings sampled at 15-minute intervals")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-slate-400"
  }, "Auto-refreshed: 12s ago")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-lg bg-slate-900/60 border border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-slate-300"
  }, "DG-01 Cylinder Block Temperature (\xB0C)"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-emerald-400 font-bold"
  }, "Nominal (62.0\xB0C)")), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 300 80",
    className: "w-full h-20 overflow-visible"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "gradTemp",
    x1: "0%",
    y1: "0%",
    x2: "0%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#3b82f6",
    stopOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#3b82f6",
    stopOpacity: "0.0"
  }))), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "20",
    x2: "300",
    y2: "20",
    stroke: "#334155",
    strokeDasharray: "3 3",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "50",
    x2: "300",
    y2: "50",
    stroke: "#1e293b",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 50 Q 50 48, 100 51 T 200 49 T 260 50 L 300 50",
    fill: "none",
    stroke: "#38bdf8",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 50 Q 50 48, 100 51 T 200 49 T 260 50 L 300 50 L 300 80 L 0 80 Z",
    fill: "url(#gradTemp)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "300",
    cy: "50",
    r: "4",
    fill: "#38bdf8"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2"
  }, /*#__PURE__*/React.createElement("span", null, "00:00 UTC"), /*#__PURE__*/React.createElement("span", null, "08:00 UTC"), /*#__PURE__*/React.createElement("span", null, "16:00 UTC"), /*#__PURE__*/React.createElement("span", null, "Current"))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-lg bg-slate-900/60 border border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-slate-300"
  }, "LiFePO4 Storage Bank State of Charge (% SoC)"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-emerald-400 font-bold"
  }, energy.batterySocPercent, "%")), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 300 80",
    className: "w-full h-20 overflow-visible"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "gradSoc",
    x1: "0%",
    y1: "0%",
    x2: "0%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#10b981",
    stopOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#10b981",
    stopOpacity: "0.0"
  }))), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "20",
    x2: "300",
    y2: "20",
    stroke: "#334155",
    strokeDasharray: "3 3",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "50",
    x2: "300",
    y2: "50",
    stroke: "#1e293b",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 42 Q 60 48, 120 40 T 220 34 T 270 36 L 300 35",
    fill: "none",
    stroke: "#10b981",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 42 Q 60 48, 120 40 T 220 34 T 270 36 L 300 35 L 300 80 L 0 80 Z",
    fill: "url(#gradSoc)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "300",
    cy: "35",
    r: "4",
    fill: "#10b981"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2"
  }, /*#__PURE__*/React.createElement("span", null, "00:00 UTC"), /*#__PURE__*/React.createElement("span", null, "08:00 UTC"), /*#__PURE__*/React.createElement("span", null, "16:00 UTC"), /*#__PURE__*/React.createElement("span", null, "Current"))))));
}

// --- components/DiagnosticsView.js ---
// Antarctic Digital Twin - Predictive AI Diagnostics & Anomaly Test Bench
// National Centre for Polar and Ocean Research (NCPOR)

function DiagnosticsView({
  faultActive,
  faultStep,
  faultTemp,
  faultHistory,
  onInjectFault,
  onMitigateFault,
  isOptimized,
  onOptimizeGrid
}) {
  const [anomalyScore, setAnomalyScore] = useState(12);
  useEffect(() => {
    if (faultActive) {
      // Map fault step to realistic anomaly probability score (12% to 94%)
      const scores = [12, 28, 48, 72, 89, 94];
      setAnomalyScore(scores[Math.min(faultStep, scores.length - 1)]);
    } else {
      setAnomalyScore(12);
    }
  }, [faultActive, faultStep]);
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 view-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-normal font-mono"
  }, "EDGE ML MODEL: POLAR-NET-V4"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "Inference Latency: 4.2ms \u2022 Running on Local Edge Gateway")), /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-extrabold text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83E\uDDE0"), " Predictive AI Diagnostics & Automated Fault Mitigation"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-0.5"
  }, "Real-time FFT vibration harmonics, autoencoder reconstruction error, and automated failover control")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, !faultActive ? /*#__PURE__*/React.createElement("button", {
    onClick: onInjectFault,
    className: "btn-primary bg-rose-600 hover:bg-rose-700 text-xs",
    title: "Simulate bearing friction and coolant degradation in primary generator"
  }, "\u26A0\uFE0F Inject DG-01 Fault") : /*#__PURE__*/React.createElement("button", {
    onClick: onMitigateFault,
    className: "btn-primary bg-emerald-600 hover:bg-emerald-700 text-xs",
    title: "Execute automated failover to standby DG-02 and shed non-essential loads"
  }, "\uD83D\uDEE1\uFE0F Execute Autonomous Mitigation"), /*#__PURE__*/React.createElement("button", {
    onClick: onOptimizeGrid,
    className: `btn-secondary text-xs ${isOptimized ? 'border-emerald-500 text-emerald-400' : ''}`,
    title: "Run AI microgrid dispatch optimization"
  }, isOptimized ? "✓ Microgrid Optimized" : "⚡ Optimize Microgrid"))), /*#__PURE__*/React.createElement("div", {
    className: `card-panel p-5 border transition-all ${faultActive ? faultStep >= 3 ? 'border-rose-500/50 bg-rose-950/20' : 'border-amber-500/50 bg-amber-950/20' : 'border-slate-800'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row lg:items-center justify-between gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-w-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: `status-dot ${faultActive ? faultStep >= 3 ? 'critical' : 'warning' : 'normal'}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono uppercase font-bold tracking-wider text-slate-300"
  }, faultActive ? faultStep >= 3 ? "CRITICAL ANOMALY PREDICTED — FAILURE IMMINENT" : "DEVELOPING THERMAL ANOMALY DETECTED" : "ALL SUBSYSTEMS NOMINAL — ZERO CRITICAL DRIFT")), /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-bold text-white leading-tight"
  }, faultActive ? `DG-01 Cyl-4 Heat Exchanger Flow Restriction (${faultTemp}°C)` : "Continuous Multi-Variate Telemetry Health Index: 98.4%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 leading-relaxed"
  }, faultActive ? `Vibration sensor #3 indicates abnormal 184 Hz harmonic sidebands accompanied by a ${((faultTemp - 62) / 62 * 100).toFixed(0)}% temperature spike. Predictive model projects catastrophic engine seizure within 4.2 hours if unmitigated.` : "Autoencoder neural network analyzes 142 continuous telemetry channels every 1.5 seconds. Current variance remains well within the ±3σ confidence envelope.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center min-w-[200px]"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold mb-1"
  }, "Anomaly Risk Probability"), /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-extrabold font-mono text-white mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: anomalyScore > 60 ? 'text-rose-400' : anomalyScore > 30 ? 'text-amber-400' : 'text-emerald-400'
  }, anomalyScore, "%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-full rounded-full transition-all duration-500 ${anomalyScore > 60 ? 'bg-rose-500' : anomalyScore > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`,
    style: {
      width: `${anomalyScore}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 font-mono"
  }, "Threshold: > 45% Triggers Alarm")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-5 border-slate-800 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-800/80 pb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white uppercase tracking-wider"
  }, "Generator Thermal Gradient Curve"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "Current DG-01 Cylinder Block Reading: ", /*#__PURE__*/React.createElement("strong", {
    className: "font-mono text-white"
  }, faultTemp, "\xB0C"))), /*#__PURE__*/React.createElement("span", {
    className: `badge ${faultTemp > 80 ? 'badge-critical' : faultTemp > 65 ? 'badge-warning' : 'badge-normal'} font-mono`
  }, "Baseline: 62.0\xB0C")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-lg bg-slate-900/80 border border-slate-800"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 100",
    className: "w-full h-28 overflow-visible"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "25",
    x2: "320",
    y2: "25",
    stroke: "#ef4444",
    strokeDasharray: "3 3",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "5",
    y: "20",
    fill: "#ef4444",
    fontSize: "9",
    fontFamily: "monospace"
  }, "Critical Trip Limit: 85\xB0C"), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "50",
    x2: "320",
    y2: "50",
    stroke: "#f59e0b",
    strokeDasharray: "3 3",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "5",
    y: "46",
    fill: "#f59e0b",
    fontSize: "9",
    fontFamily: "monospace"
  }, "Warning Advisory: 75\xB0C"), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "80",
    x2: "320",
    y2: "80",
    stroke: "#334155",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "5",
    y: "76",
    fill: "#94a3b8",
    fontSize: "9",
    fontFamily: "monospace"
  }, "Nominal Band: 60-64\xB0C"), (() => {
    const pts = faultHistory.map((val, idx) => {
      const x = idx / (faultHistory.length - 1 || 1) * 300 + 10;
      // Map 55°C to y=90, 90°C to y=15
      const y = 90 - (val - 55) / 35 * 75;
      return `${x},${y}`;
    });
    const d = `M ${pts.join(" L ")}`;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: d,
      fill: "none",
      stroke: faultTemp > 80 ? "#ef4444" : faultTemp > 65 ? "#f59e0b" : "#38bdf8",
      strokeWidth: "3"
    }), faultHistory.map((val, idx) => {
      const x = idx / (faultHistory.length - 1 || 1) * 300 + 10;
      const y = 90 - (val - 55) / 35 * 75;
      return /*#__PURE__*/React.createElement("circle", {
        key: idx,
        cx: x,
        cy: y,
        r: idx === faultHistory.length - 1 ? 5 : 3,
        fill: val > 80 ? "#ef4444" : val > 65 ? "#f59e0b" : "#38bdf8"
      });
    }));
  })()), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-[10px] text-slate-400 font-mono mt-3"
  }, /*#__PURE__*/React.createElement("span", null, "T-60s"), /*#__PURE__*/React.createElement("span", null, "T-45s"), /*#__PURE__*/React.createElement("span", null, "T-30s"), /*#__PURE__*/React.createElement("span", null, "T-15s"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, "Now (", faultTemp, "\xB0C)")))), /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-5 border-slate-800 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-800/80 pb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white uppercase tracking-wider"
  }, "Autonomous Mitigation Workflow"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "SOP ruleset automatically executed upon critical threshold breach")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2.5 text-xs"
  }, [{
    step: "1",
    title: "Initiate DG-02 Hot Standby Start Sequence",
    desc: "Engage electric starter, prime fuel injection rail, bring to 1500 RPM synchronizer.",
    done: faultActive && faultStep >= 4
  }, {
    step: "2",
    title: "Automatic Microgrid Bus Synchronous Transfer",
    desc: "Seamless phase matching and bus closure without interrupting station power.",
    done: faultActive && faultStep >= 5
  }, {
    step: "3",
    title: "Auxiliary Glycol Cooling Loop Ramp-Up",
    desc: "Switch secondary circulation valve from 40% to 100% capacity.",
    done: faultActive && faultStep >= 3
  }, {
    step: "4",
    title: "Non-Critical Scientific Load Shedding",
    desc: "Temporarily pause atmospheric LIDAR chiller and non-essential soil heaters.",
    done: isOptimized || faultActive && faultStep >= 5
  }].map((s, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: `p-3 rounded-lg border transition-all flex items-start gap-3 ${s.done ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-slate-900/60 border-slate-800 text-slate-300'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shrink-0 ${s.done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`
  }, s.done ? "✓" : s.step), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-white leading-tight"
  }, s.title), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 mt-0.5 leading-relaxed"
  }, s.desc))))))));
}

// --- components/AlertsView.js ---
// Antarctic Digital Twin - Operational Alerts & Incident Response Center
// National Centre for Polar and Ocean Research (NCPOR)

function AlertsView({
  alerts,
  onAcknowledgeAlert,
  onResolveAlert
}) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const filteredAlerts = alerts.filter(alert => {
    if (filter === "critical" && alert.severity !== "CRITICAL") return false;
    if (filter === "warning" && alert.severity !== "WARNING") return false;
    if (filter === "info" && alert.severity !== "INFO") return false;
    if (filter === "active" && alert.resolved) return false;
    if (filter === "resolved" && !alert.resolved) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return alert.summary.toLowerCase().includes(q) || alert.equipment.toLowerCase().includes(q) || alert.station.toLowerCase().includes(q) || alert.id.toLowerCase().includes(q);
    }
    return true;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 view-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-extrabold text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD14"), " Station Operations Alert Center"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-0.5"
  }, "Real-time incident dispatch, severity triage, and Standard Operating Procedure (SOP) guidance")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search alerts or equipment...",
    value: search,
    onChange: e => setSearch(e.target.value),
    className: "bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-48 sm:w-60"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5"
  }, [{
    id: "all",
    label: "All"
  }, {
    id: "critical",
    label: "Critical"
  }, {
    id: "warning",
    label: "Warning"
  }, {
    id: "active",
    label: "Active"
  }, {
    id: "resolved",
    label: "Resolved"
  }].map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    onClick: () => setFilter(f.id),
    className: `px-3 py-1 text-xs font-semibold rounded-md transition-all ${filter === f.id ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"}`
  }, f.label))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, filteredAlerts.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-12 text-center border-slate-800 space-y-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl block"
  }, "\uD83D\uDEE1\uFE0F"), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white"
  }, "No Matching Operational Alerts"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "All monitored station parameters in this filter category remain within nominal tolerance.")) : filteredAlerts.map(alert => /*#__PURE__*/React.createElement("div", {
    key: alert.id,
    className: `card-panel p-4 border transition-all ${alert.severity === "CRITICAL" ? "border-rose-500/40 bg-rose-950/15" : alert.severity === "WARNING" ? "border-amber-500/40 bg-amber-950/15" : "border-slate-800 bg-slate-900/50"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row lg:items-start justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: `badge ${alert.severity === "CRITICAL" ? "badge-critical" : alert.severity === "WARNING" ? "badge-warning" : "badge-normal"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `status-dot ${alert.severity === "CRITICAL" ? "critical" : alert.severity === "WARNING" ? "warning" : "normal"}`
  }), alert.severity), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono font-bold text-white"
  }, alert.id), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-slate-400"
  }, "\u2022 ", alert.station, " (", alert.equipment, ")"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-mono text-slate-500 ml-auto"
  }, "\uD83D\uDD52 ", alert.timestamp)), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white leading-snug"
  }, alert.summary), alert.rootCause && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-400"
  }, "Potential Cause:"), " ", alert.rootCause), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs text-slate-200 mt-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-sky-400 block mb-1"
  }, "\uD83D\uDCCB Mandatory SOP Action:"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] leading-relaxed text-slate-300"
  }, alert.sopAction))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 shrink-0 self-end lg:self-start"
  }, !alert.acknowledged && /*#__PURE__*/React.createElement("button", {
    onClick: () => onAcknowledgeAlert(alert.id),
    className: "btn-secondary text-xs py-1.5 px-3"
  }, "Acknowledge"), !alert.resolved ? /*#__PURE__*/React.createElement("button", {
    onClick: () => onResolveAlert(alert.id),
    className: "btn-primary text-xs py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700"
  }, "\u2713 Mark Resolved") : /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-emerald-400 font-semibold px-2 py-1 bg-emerald-950/40 rounded border border-emerald-800/40"
  }, "\u2713 Resolved")))))));
}

// --- components/LogisticsView.js ---
// Antarctic Digital Twin - Logistics, Supply Chain & Polar Fleet Management
// National Centre for Polar and Ocean Research (NCPOR)

function LogisticsView({
  station
}) {
  const v = EXPEDITION_VESSEL;
  const energy = station.energy;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 view-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-800 pb-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-extrabold text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDEA2"), " Polar Expedition Fleet & Strategic Logistics"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-0.5"
  }, "Chartered icebreaker transit tracking, fuel autonomy margin, and winter expedition ration reserves")), /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/20 border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-normal font-mono"
  }, "ICEBREAKER IN TRANSIT"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-slate-400"
  }, "Voyage ID: ", v.voyageNumber, " \u2022 Class: ", v.iceClass)), /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-bold text-white tracking-tight"
  }, v.vesselName), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 mt-0.5"
  }, "Route: ", /*#__PURE__*/React.createElement("span", {
    className: "text-white font-medium"
  }, v.originPort), " \u2794", " ", /*#__PURE__*/React.createElement("span", {
    className: "text-white font-medium"
  }, v.destinationPort))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3 font-mono text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-sans"
  }, "Current Position"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-white"
  }, v.currentCoordinates)), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-sans"
  }, "Speed Over Ground"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sky-400"
  }, v.speedKnots, " Knots")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-sans"
  }, "Distance to Prydz Bay"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-amber-400"
  }, v.distanceToPrydzBayNm, " Nautical Miles")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-sans"
  }, "Estimated Arrival"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-emerald-400"
  }, v.etaPrydzBay)))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3 rounded-lg border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Bunker Fuel Consignment"), /*#__PURE__*/React.createElement("span", {
    className: "text-base font-bold font-mono text-white mt-0.5 block"
  }, (v.cargoManifest.polarFuelLitres / 1000).toLocaleString(), " kL"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "Jet A-1 Polar Blend")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3 rounded-lg border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Dry Rations & Sustenance"), /*#__PURE__*/React.createElement("span", {
    className: "text-base font-bold font-mono text-white mt-0.5 block"
  }, v.cargoManifest.dryProvisionsTons, " Metric Tons"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "45th Wintering Team Allocation")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3 rounded-lg border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Scientific Instrumentation"), /*#__PURE__*/React.createElement("span", {
    className: "text-base font-bold font-mono text-white mt-0.5 block"
  }, v.cargoManifest.scientificPayloadTons, " Tons"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "ISRO / SOI / IMD Payloads")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-3 rounded-lg border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px]"
  }, "Polar Heavy Vehicles"), /*#__PURE__*/React.createElement("span", {
    className: "text-base font-bold font-mono text-white mt-0.5 block"
  }, "3 Units"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, "PistenBully Snowcats")))), /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-5 border-slate-800 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-800/80 pb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-sm font-bold text-white uppercase tracking-wider"
  }, station.name, " Consumables & Survival Reserves Inventory"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "Audit status of year-round critical materials at station site")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-slate-400"
  }, "Audit Date: 2026-09-24")), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left text-xs"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px] font-mono"
  }, /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Item Description"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Category"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Current Stock"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Days Remaining"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    className: "py-2.5 px-3"
  }, "Resupply Window"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-800/60"
  }, LOGISTICS_DATA.map((item, idx) => /*#__PURE__*/React.createElement("tr", {
    key: idx,
    className: "hover:bg-slate-900/40 transition-colors"
  }, /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3 font-semibold text-white"
  }, item.item, item.notes && /*#__PURE__*/React.createElement("span", {
    className: "block text-[10px] text-slate-400 font-normal mt-0.5"
  }, item.notes)), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3 text-slate-300 font-mono text-[11px]"
  }, item.category), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3 font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, item.currentStock), /*#__PURE__*/React.createElement("div", {
    className: "w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-full rounded-full ${item.stockPct < 50 ? 'bg-amber-500' : 'bg-blue-500'}`,
    style: {
      width: `${item.stockPct}%`
    }
  }))), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3 font-mono font-bold text-white"
  }, item.daysRemaining, " Days"), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `badge ${item.status === "Normal" ? "badge-normal" : "badge-warning"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `status-dot ${item.status === "Normal" ? "normal" : "warning"}`
  }), item.status)), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-3 text-slate-300 text-[11px]"
  }, item.resupplyWindow))))))));
}

// --- components/ArchitectureView.js ---
// Antarctic Digital Twin - Edge Architecture & Satellite Store-and-Forward System
// National Centre for Polar and Ocean Research (NCPOR)

function ArchitectureView({
  satelliteOnline,
  onToggleSatellite,
  bufferedCount,
  onFlushBuffer
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 view-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-800 pb-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-extrabold text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDEF0\uFE0F"), " Edge-to-Cloud Architecture & Satellite Resilience"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-0.5"
  }, "Resilient IoT store-and-forward edge caching designed for high-latitude polar satellite disruptions")), /*#__PURE__*/React.createElement("div", {
    className: `card-panel p-5 border transition-all ${satelliteOnline ? 'border-slate-800 bg-slate-900/60' : 'border-amber-500/50 bg-amber-950/20'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: `status-dot ${satelliteOnline ? 'normal' : 'warning'}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono uppercase font-bold tracking-wider text-slate-300"
  }, "UPLINK STATUS: ", satelliteOnline ? "SYNCHRONIZED (ONLINE)" : "OFFLINE (STORE & FORWARD ACTIVE)")), /*#__PURE__*/React.createElement("h2", {
    className: "text-base font-bold text-white"
  }, satelliteOnline ? "Active GSAT-14 Satellite Carrier Lock (480ms Latency)" : `Solar Geomagnetic Storm / Severe Blizzard Blackout (${bufferedCount} Packets Queued)`), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 max-w-2xl leading-relaxed"
  }, satelliteOnline ? "Telemetry streams continuously from station industrial controllers via 9.1m tracking radome dish to NCPOR Headquarters in Goa." : "Station local edge server continues executing autonomous SCADA safety routines. All sensor telemetry is safely queued in the local SQLite WAL journal.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 shrink-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggleSatellite,
    className: `btn-primary text-xs ${satelliteOnline ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'}`
  }, satelliteOnline ? "Simulate Satellite Drop" : "Restore Satellite Link"), !satelliteOnline && bufferedCount > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: onFlushBuffer,
    className: "btn-secondary text-xs"
  }, "Flush Queue")))), /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-6 border-slate-800 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-800/80 pb-3"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-sm font-bold text-white uppercase tracking-wider"
  }, "NCPOR Antarctic Digital Twin Three-Tier Hierarchy"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "Zero single-point-of-failure mission-critical polar systems design")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-normal font-mono text-[10px]"
  }, "TIER 1 \u2022 ON-STATION EDGE"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-emerald-400 font-bold"
  }, "< 2ms LAN")), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white"
  }, "Industrial SCADA & Local Edge Server"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 leading-relaxed"
  }, "Industrial embedded controllers running on station microgrid LAN. Performs real-time autonomous load shedding, DG synchronization, and life-support safety loops."), /*#__PURE__*/React.createElement("ul", {
    className: "text-[11px] text-slate-400 space-y-1 pt-1 font-mono"
  }, /*#__PURE__*/React.createElement("li", null, "\u2713 Modbus TCP / MQTT telemetry"), /*#__PURE__*/React.createElement("li", null, "\u2713 Local SQLite WAL database"), /*#__PURE__*/React.createElement("li", null, "\u2713 Edge TinyML anomaly detection"))), /*#__PURE__*/React.createElement("div", {
    className: `p-5 rounded-xl border space-y-3 transition-all ${satelliteOnline ? 'bg-slate-900/80 border-slate-800' : 'bg-amber-950/20 border-amber-500/40'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: `badge ${satelliteOnline ? 'badge-normal' : 'badge-warning'} font-mono text-[10px]`
  }, "TIER 2 \u2022 POLAR SATELLITE"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-sky-400 font-bold"
  }, "~480ms Latency")), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white"
  }, "High-Latitude Geostationary Uplink"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 leading-relaxed"
  }, "9.1m tracking radome dish communicating with ISRO GSAT and Inmarsat constellations. Handles intermittent connectivity with automated store-and-forward batching."), /*#__PURE__*/React.createElement("ul", {
    className: "text-[11px] text-slate-400 space-y-1 pt-1 font-mono"
  }, /*#__PURE__*/React.createElement("li", null, "\u2713 Differential delta compression"), /*#__PURE__*/React.createElement("li", null, "\u2713 Deduplication & priority queueing"), /*#__PURE__*/React.createElement("li", null, "\u2713 AES-256 encrypted VPN tunnel"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-normal font-mono text-[10px]"
  }, "TIER 3 \u2022 HQ OPERATIONS"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-blue-400 font-bold"
  }, "NCPOR Goa")), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white"
  }, "Central Operations & Digital Twin"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 leading-relaxed"
  }, "High-availability web twin hosted in secure cloud infrastructure. Provides real-time situational awareness, long-term predictive analytics, and expedition logistics dispatch."), /*#__PURE__*/React.createElement("ul", {
    className: "text-[11px] text-slate-400 space-y-1 pt-1 font-mono"
  }, /*#__PURE__*/React.createElement("li", null, "\u2713 Interactive 3D WebGL Digital Twin"), /*#__PURE__*/React.createElement("li", null, "\u2713 Multi-station centralized monitoring"), /*#__PURE__*/React.createElement("li", null, "\u2713 Fleet voyage & fuel trajectory planning"))))));
}

// --- components/AboutView.js ---
// Antarctic Digital Twin - About NCPOR & System Architecture Documentation
// National Centre for Polar and Ocean Research (NCPOR)

function AboutView() {
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 view-enter max-w-5xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/30 border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-normal font-mono"
  }, "SMART INDIA HACKATHON \u2022 PS 26060"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono text-slate-400"
  }, "NCPOR \u2022 Ministry of Earth Sciences, Govt. of India")), /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl lg:text-3xl font-extrabold text-white tracking-tight"
  }, "Antarctic Digital Twin Operations Platform"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-300 mt-2 leading-relaxed"
  }, "A centralized, mission-critical remote management system engineered for real-time monitoring, predictive maintenance, and strategic logistics coordination of India's permanent research stations in Antarctica: ", /*#__PURE__*/React.createElement("strong", null, "Bharati"), " and ", /*#__PURE__*/React.createElement("strong", null, "Maitri"), ".")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-5 border-slate-800 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-800/80 pb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono text-sky-400 uppercase font-bold tracking-wider"
  }, "East Antarctica (Prydz Bay)"), /*#__PURE__*/React.createElement("h2", {
    className: "text-base font-bold text-white"
  }, "Bharati Research Station")), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-normal font-mono"
  }, "EST. 2012")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 leading-relaxed"
  }, "Located in Larsemann Hills at 69\xB024\u203228\u2033S 76\xB011\u203214\u2033E, Bharati is one of the world's most advanced polar stations. Designed by bof Architekten and IMS Ingenieurgesellschaft, it is constructed from 134 prefabricated shipping container modules wrapped in a faceted, aerodynamic titanium-composite envelope raised on 24 heavy-duty stilts to avoid snowdrifts."), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-xs font-mono pt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-2 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-sans"
  }, "Power Plant"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-semibold"
  }, "Dual Volvo Penta 350 kVA")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-2 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-sans"
  }, "Satellite Ground Link"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-semibold"
  }, "9.1m Radome (NRSC)")))), /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-5 border-slate-800 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-800/80 pb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider"
  }, "Queen Maud Land (Schirmacher)"), /*#__PURE__*/React.createElement("h2", {
    className: "text-base font-bold text-white"
  }, "Maitri Research Station")), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-normal font-mono"
  }, "EST. 1989")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 leading-relaxed"
  }, "Positioned at 70\xB045\u203258\u2033S 11\xB043\u203256\u2033E in the ice-free rocky Oasis of Schirmacher, Maitri is India's historic second Antarctic research station. Flanked by Lake Priyadarshini, it has supported decades of breakthrough research in geology, meteorology, geomagnetism, and glaciology."), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-xs font-mono pt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-2 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-sans"
  }, "Water Supply"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-semibold"
  }, "Lake Priyadarshini Line")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-2 rounded border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-sans"
  }, "Elevation"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-semibold"
  }, "117 m a.s.l."))))), /*#__PURE__*/React.createElement("div", {
    className: "card-panel p-6 border-slate-800 space-y-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800/80 pb-3"
  }, "Core Digital Twin Engineering Objectives"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl block"
  }, "\uD83D\uDEE1\uFE0F"), /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-white"
  }, "Zero Life-Support Interruption"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 leading-relaxed"
  }, "Automated hydronic heat recovery and dual-circuit glycol circulation prevents frozen pipelines and maintains habitat temperature even during -40\xB0C blizzards.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl block"
  }, "\u26A1"), /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-white"
  }, "AI Microgrid Optimization"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 leading-relaxed"
  }, "Predictive load shedding and battery storage balancing reduces polar fuel consumption by up to 14.8%, saving critical fuel during long polar winters.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl block"
  }, "\uD83D\uDEF0\uFE0F"), /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-white"
  }, "Intermittent Satellite Resilience"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 leading-relaxed"
  }, "Edge store-and-forward architecture with local SQLite persistence guarantees uninterrupted operation when solar storms block geostationary polar satellite uplinks.")))));
}

// --- app.js ---
// Antarctic Digital Twin - Master Application Controller
// National Centre for Polar and Ocean Research (NCPOR)

function App() {
  // Global Station & Navigation State
  const [currentStation, setCurrentStation] = useState("bharati");
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState("NCPOR Administrator");
  const [stations, setStations] = useState(STATIONS_DATA);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [selectedZone, setSelectedZone] = useState(STATIONS_DATA.bharati.zones[0]);

  // 3D Environment Settings
  const [lightingMode, setLightingMode] = useState("day"); // 'day', 'twilight', 'night'
  const [isSnowing, setIsSnowing] = useState(true);

  // Satellite Resilience Simulator State
  const [satelliteOnline, setSatelliteOnline] = useState(true);
  const [bufferedCount, setBufferedCount] = useState(0);

  // Fault Injection & AI Test Bench State
  const [faultActive, setFaultActive] = useState(false);
  const [faultStep, setFaultStep] = useState(0);
  const [faultTemp, setFaultTemp] = useState(62.0);
  const [faultHistory, setFaultHistory] = useState([62, 62, 63, 62, 62]);
  const [isOptimized, setIsOptimized] = useState(false);

  // Toast Notification System
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, {
      id,
      message,
      type
    }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  // Update selected zone when station switches
  const handleStationChange = stationId => {
    setCurrentStation(stationId);
    setSelectedZone(stations[stationId].zones[0]);
    addToast(`Switched active command to ${stations[stationId].name}`, "info");
  };

  // Satellite Toggle Simulation
  const handleToggleSatellite = () => {
    if (satelliteOnline) {
      setSatelliteOnline(false);
      setBufferedCount(14);
      addToast("Satellite uplink offline: Store-and-forward edge buffer active", "warning");
    } else {
      setSatelliteOnline(true);
      addToast(`Satellite uplink restored! Flushed ${bufferedCount || 18} packets to NCPOR Cloud`, "success");
      setBufferedCount(0);
    }
  };

  // Buffer Flush Action
  const handleFlushBuffer = () => {
    setBufferedCount(0);
    addToast("Manual queue flush complete.", "info");
  };

  // Increment buffer packets automatically while offline
  useEffect(() => {
    let interval;
    if (!satelliteOnline) {
      interval = setInterval(() => {
        setBufferedCount(c => c + 1);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [satelliteOnline]);

  // Fault Injection Multi-step simulation
  const handleInjectFault = () => {
    setFaultActive(true);
    setFaultStep(1);
    addToast("Fault injected: DG-01 Cylinder 4 cooling restriction initiated", "warning");
    const tempSteps = [62, 67, 73, 79, 84, 88];
    let step = 1;
    const interval = setInterval(() => {
      if (step < tempSteps.length) {
        const t = tempSteps[step];
        setFaultTemp(t);
        setFaultStep(step);
        setFaultHistory(h => [...h.slice(-10), t]);
        if (step === 3) {
          addToast("AI Warning: Vibration harmonic shift + temperature rising (79°C)", "warning");
        }
        if (step === 5) {
          addToast("CRITICAL ALARM: DG-01 thermal limit breached! (88°C)", "critical");
          // Add critical alert to list if not already there
          setAlerts(prev => [{
            id: `ALT-2026-0${Math.floor(Math.random() * 90 + 10)}`,
            station: stations[currentStation].name,
            stationId: currentStation,
            zoneId: "generator_room",
            equipment: "Diesel Generator 01 (Primary Base-Load)",
            parameter: "Cylinder 4 Temperature Runaway",
            severity: "CRITICAL",
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
            status: "Active",
            summary: "Critical thermal runaway detected on DG-01 cylinder 4 (88°C).",
            rootCause: "Coolant jacket blockage + abnormal bearing friction.",
            sopAction: "Trigger autonomous bus transfer to DG-02 immediately.",
            acknowledged: false,
            resolved: false
          }, ...prev]);
        }
        step++;
      } else {
        clearInterval(interval);
      }
    }, 2200);
  };

  // Autonomous Mitigation Action
  const handleMitigateFault = () => {
    addToast("Autonomous Mitigation Sequence Engaged: Transferring bus to DG-02...", "info");
    setTimeout(() => {
      setFaultActive(false);
      setFaultStep(0);
      setFaultTemp(62.0);
      setFaultHistory(h => [...h.slice(-10), 62]);
      addToast("Mitigation Complete: Station load transferred to DG-02. DG-01 cooling down.", "success");
    }, 1800);
  };

  // Microgrid Optimization
  const handleOptimizeGrid = () => {
    setIsOptimized(true);
    addToast("AI Microgrid Dispatch optimized: Fuel burn reduced by 14.2%!", "success");
  };

  // Alert Actions
  const handleAcknowledgeAlert = id => {
    setAlerts(prev => prev.map(a => a.id === id ? {
      ...a,
      acknowledged: true
    } : a));
    addToast("Alert acknowledged.", "info");
  };
  const handleResolveAlert = id => {
    setAlerts(prev => prev.map(a => a.id === id ? {
      ...a,
      resolved: true,
      status: "Resolved"
    } : a));
    addToast("Alert marked resolved.", "success");
  };
  const activeStation = stations[currentStation];
  const activeAlertCount = alerts.filter(a => !a.resolved).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-[#080d1a] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white"
  }, /*#__PURE__*/React.createElement(Header, {
    currentStation: currentStation,
    onStationChange: handleStationChange,
    stations: stations,
    userRole: userRole,
    onRoleChange: setUserRole,
    satelliteOnline: satelliteOnline,
    onToggleSatellite: handleToggleSatellite,
    bufferedCount: bufferedCount,
    onQuickSimulate: () => {
      setActiveTab("diagnostics");
      if (!faultActive) handleInjectFault();
    }
  }), /*#__PURE__*/React.createElement(Navigation, {
    activeTab: activeTab,
    onTabChange: setActiveTab,
    alertCount: activeAlertCount,
    offlineBufferedCount: bufferedCount
  }), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 max-w-7xl w-full mx-auto px-4 lg:px-6 py-6"
  }, activeTab === "overview" && /*#__PURE__*/React.createElement(OverviewView, {
    station: activeStation,
    onNavigate: setActiveTab,
    onSelectZone: setSelectedZone
  }), activeTab === "3d-twin" && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 view-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-extrabold text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF10"), " Photorealistic 3D Digital Twin \u2022 ", activeStation.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-0.5"
  }, "Sub-millimeter architectural geometry, dynamic polar lighting, and interactive SCADA zones")), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-normal font-mono text-xs hidden sm:inline-flex"
  }, "WebGL 2.0 \u2022 Tone Mapped")), /*#__PURE__*/React.createElement(DigitalTwin3D, {
    station: activeStation,
    selectedZone: selectedZone,
    onSelectZone: setSelectedZone,
    lightingMode: lightingMode,
    setLightingMode: setLightingMode,
    isSnowing: isSnowing,
    setIsSnowing: setIsSnowing
  })), activeTab === "telemetry" && /*#__PURE__*/React.createElement(TelemetryView, {
    station: activeStation
  }), activeTab === "diagnostics" && /*#__PURE__*/React.createElement(DiagnosticsView, {
    faultActive: faultActive,
    faultStep: faultStep,
    faultTemp: faultTemp,
    faultHistory: faultHistory,
    onInjectFault: handleInjectFault,
    onMitigateFault: handleMitigateFault,
    isOptimized: isOptimized,
    onOptimizeGrid: handleOptimizeGrid
  }), activeTab === "alerts" && /*#__PURE__*/React.createElement(AlertsView, {
    alerts: alerts,
    onAcknowledgeAlert: handleAcknowledgeAlert,
    onResolveAlert: handleResolveAlert
  }), activeTab === "logistics" && /*#__PURE__*/React.createElement(LogisticsView, {
    station: activeStation
  }), activeTab === "architecture" && /*#__PURE__*/React.createElement(ArchitectureView, {
    satelliteOnline: satelliteOnline,
    onToggleSatellite: handleToggleSatellite,
    bufferedCount: bufferedCount,
    onFlushBuffer: handleFlushBuffer
  }), activeTab === "about" && /*#__PURE__*/React.createElement(AboutView, null)), /*#__PURE__*/React.createElement("footer", {
    className: "w-full border-t border-slate-900 bg-slate-950 py-4 px-4 lg:px-6 text-center text-xs text-slate-500 font-mono"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "Antarctic Digital Twin \u2022 Smart India Hackathon 2026 (PS 26060)"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "NCPOR \u2022 Ministry of Earth Sciences, Government of India"))), /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none"
  }, toasts.map(toast => /*#__PURE__*/React.createElement("div", {
    key: toast.id,
    className: `pointer-events-auto px-4 py-3 rounded-lg shadow-lg border text-xs font-medium flex items-center gap-2 animate-bounce-short ${toast.type === "critical" ? "bg-rose-950/90 border-rose-500 text-rose-200" : toast.type === "warning" ? "bg-amber-950/90 border-amber-500 text-amber-200" : toast.type === "success" ? "bg-emerald-950/90 border-emerald-500 text-emerald-200" : "bg-slate-900/90 border-slate-700 text-slate-200"}`
  }, /*#__PURE__*/React.createElement("span", null, toast.type === "critical" ? "🚨" : toast.type === "warning" ? "⚠️" : toast.type === "success" ? "✓" : "ℹ️"), /*#__PURE__*/React.createElement("span", null, toast.message)))));
}

// --- Root Mount ---

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(/*#__PURE__*/React.createElement(App, null));
}