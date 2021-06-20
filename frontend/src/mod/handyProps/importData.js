var fs = require("fs");

const q = JSON.parse(fs.readFileSync("C:\\h\\prj\\handyprops\\misc\\Table_1Tree.json", "utf8")).RECORDS;

let _mean = (a, b) => {
    if (typeof (a) === 'string')
        a = Number.parseFloat(a);
    if (typeof (b) === 'string')
        b = Number.parseFloat(b);
    return (a + b) / 2
};
let _delta = (a, b) => {
    if (typeof (a) === 'string')
        a = Number.parseFloat(a);
    if (typeof (b) === 'string')
        b = Number.parseFloat(b);
    return (b - a) / 2
};

let x = 0;
let nopt = [];
for (let k in q) {
    console.log(x++);
    let r = q[k];
    nopt = [...nopt, {
        ['ClassAllBulk']:r['All_bulk_materials'],
        ['ClassAll']:r['All_materials'],
        ['ClassCeramic']:r['Ceramics'],
        ['Color']:r['Colour'],
        ['ClassCore']:r['Core_materials'],
        ['Envelope']:r['Envelope'],
        ['ClassFoam']:r['Foams'],
        ['Name']:r['FullName'],
        ['Gid']:r['GRUID'],
        ['HasData']:r['HasData'],
        ['IsGroup']:r['IsFolder'],
        ['ClassMagnetic']:r['Magnetic_materials'],
        ['ClassMetal']:r['Metals'],
        ['Parent']:r['Parent_Identity'],
        ['ClassPolymer']:r['Polymers___All'],
        ['ClassPolymerElastomer']:r['Polymers___Elastomers'],
        ['ClassPolymerPlastic']:r['Polymers___Plastics'],
        ['_id']:r['Record_Identity'],
        ['Rid']:r['rowid'],
        ['ClassStainlessAlloy']:r['Stainless_alloys'],
        ['ClassToolSteel']:r['Tool_steels'],
        ['ShortName']:r['TreeName'],
        ['ClassWoods']:r['Woods'],
        ['Price']:_mean(r['Price_1'], r['Price_2']),
        ['Density']:_mean(r['Density_1'], r['Density_2']),
        ['TensileStrength']:_mean(r['Tensile_strength_1'], r['Tensile_strength_2']),
        ['YoungModulus']:_mean(r['Young_s_modulus_1'], r['Young_s_modulus_2']),
        ['CompressiveStrength']:_mean(r['Compressive_strength_1'], r['Compressive_strength_2']),
        ['ThermalConductivity']:_mean(r['Thermal_conductivity_1'], r['Thermal_conductivity_2']),
        ['FlexuralModulus']:_mean(r['Flexural_modulus_1'], r['Flexural_modulus_2']),
        ['ElectricalResistivity']:_mean(r['Electrical_resistivity_1'], r['Electrical_resistivity_2']),
        ['MaximumServiceTemperature']:_mean(r['Maximum_service_temperature_1'], r['Maximum_service_temperature_2']),
        ['ThermalExpansionCoefficient']:_mean(r['Thermal_expansion_coefficient_1'], r['Thermal_expansion_coefficient_2']),
        ['YieldStrength']:_mean(r['Yield_strength_(elastic_limit)_1'], r['Yield_strength_(elastic_limit)_2']),
        ['SpecificHeatCapacity']:_mean(r['Specific_heat_capacity_1'], r['Specific_heat_capacity_2']),
        ['FlexuralStrength']:_mean(r['Flexural_strength_(modulus_of_rupture)_1'], r['Flexural_strength_(modulus_of_rupture)_2']),
        ['PoissonRatio']:_mean(r['Poisson_s_ratio_1'], r['Poisson_s_ratio_2']),
        ['ShearModulus']:_mean(r['Shear_modulus_1'], r['Shear_modulus_2']),
        ['MinimumServiceTemperature']:_mean(r['Minimum_service_temperature_1'], r['Minimum_service_temperature_2']),
        ['HardnessVickers']:_mean(r['Hardness___Vickers_1'], r['Hardness___Vickers_2']),
        ['Elongation']:_mean(r['Elongation_1'], r['Elongation_2']),
        ['FractureToughness']:_mean(r['Fracture_toughness_1'], r['Fracture_toughness_2']),
        ['FatigueStrength']:_mean(r['Fatigue_strength_at0^7_cycles_1'], r['Fatigue_strength_at0^7_cycles_2']),
        ['MeltingPoint']:_mean(r['Melting_point_1'], r['Melting_point_2']),
        ['LatentHeatFusion']:_mean(r['Latent_heat_of_fusion_1'], r['Latent_heat_of_fusion_2']),
        ['GalvanicPotential']:_mean(r['Galvanic_potential_1'], r['Galvanic_potential_2']),
        ['GlassTemperature']:_mean(r['Glass_temperature_1'], r['Glass_temperature_2']),
        ['CompressiveModulus']:_mean(r['Compressive_modulus_1'], r['Compressive_modulus_2']),
        ['ShearStrength']:_mean(r['Shear_strength_1'], r['Shear_strength_2']),
        ['HardnessBrinell']:_mean(r['Hardness___Brinell_1'], r['Hardness___Brinell_2']),
        ['ImpactStrength23']:_mean(r['Impact_strength,_notched_23_°C_1'], r['Impact_strength,_notched_23_°C_2']),
        ['MeltTemperature']:_mean(r['Melt_temperature_1'], r['Melt_temperature_2']),
        ['PriceDelta']:_delta(r['Price_1'], r['Price_2']),
        ['DensityDelta']:_delta(r['Density_1'], r['Density_2']),
        ['TensileStrengthDelta']:_delta(r['Tensile_strength_1'], r['Tensile_strength_2']),
        ['YoungModulusDelta']:_delta(r['Young_s_modulus_1'], r['Young_s_modulus_2']),
        ['CompressiveStrengthDelta']:_delta(r['Compressive_strength_1'], r['Compressive_strength_2']),
        ['ThermalConductivityDelta']:_delta(r['Thermal_conductivity_1'], r['Thermal_conductivity_2']),
        ['FlexuralModulusDelta']:_delta(r['Flexural_modulus_1'], r['Flexural_modulus_2']),
        ['ElectricalResistivityDelta']:_delta(r['Electrical_resistivity_1'], r['Electrical_resistivity_2']),
        ['MaximumServiceTemperatureDelta']:_delta(r['Maximum_service_temperature_1'], r['Maximum_service_temperature_2']),
        ['ThermalExpansionCoefficientDelta']:_delta(r['Thermal_expansion_coefficient_1'], r['Thermal_expansion_coefficient_2']),
        ['YieldStrengthDelta']:_delta(r['Yield_strength_(elastic_limit)_1'], r['Yield_strength_(elastic_limit)_2']),
        ['SpecificHeatCapacityDelta']:_delta(r['Specific_heat_capacity_1'], r['Specific_heat_capacity_2']),
        ['FlexuralStrengthDelta']:_delta(r['Flexural_strength_(modulus_of_rupture)_1'], r['Flexural_strength_(modulus_of_rupture)_2']),
        ['PoissonRatioDelta']:_delta(r['Poisson_s_ratio_1'], r['Poisson_s_ratio_2']),
        ['ShearModulusDelta']:_delta(r['Shear_modulus_1'], r['Shear_modulus_2']),
        ['MinimumServiceTemperatureDelta']:_delta(r['Minimum_service_temperature_1'], r['Minimum_service_temperature_2']),
        ['HardnessVickersDelta']:_delta(r['Hardness___Vickers_1'], r['Hardness___Vickers_2']),
        ['ElongationDelta']:_delta(r['Elongation_1'], r['Elongation_2']),
        ['FractureToughnessDelta']:_delta(r['Fracture_toughness_1'], r['Fracture_toughness_2']),
        ['FatigueStrengthDelta']:_delta(r['Fatigue_strength_at0^7_cycles_1'], r['Fatigue_strength_at0^7_cycles_2']),
        ['MeltingPointDelta']:_delta(r['Melting_point_1'], r['Melting_point_2']),
        ['LatentHeatFusionDelta']:_delta(r['Latent_heat_of_fusion_1'], r['Latent_heat_of_fusion_2']),
        ['GalvanicPotentialDelta']:_delta(r['Galvanic_potential_1'], r['Galvanic_potential_2']),
        ['GlassTemperatureDelta']:_delta(r['Glass_temperature_1'], r['Glass_temperature_2']),
        ['CompressiveModulusDelta']:_delta(r['Compressive_modulus_1'], r['Compressive_modulus_2']),
        ['ShearStrengthDelta']:_delta(r['Shear_strength_1'], r['Shear_strength_2']),
        ['HardnessBrinellDelta']:_delta(r['Hardness___Brinell_1'], r['Hardness___Brinell_2']),
        ['ImpactStrength23Delta']:_delta(r['Impact_strength,_notched_23_°C_1'], r['Impact_strength,_notched_23_°C_2']),
        ['MeltTemperatureDelta']:_delta(r['Melt_temperature_1'], r['Melt_temperature_2']),

    }];
}

let data = JSON.stringify(nopt, null, 2);
fs.writeFile('C:\\h\\prj\\handyprops\\misc\\HandyPropsData.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

// opt.map(a=>{
// //     console.log(a);
// // });