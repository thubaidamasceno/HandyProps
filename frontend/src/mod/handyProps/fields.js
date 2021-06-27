// pt - nome da propriedade em portugues
// g - se propriedade pod ser exibida no grid
// n - se numérico
// fixed - não pode ser invisibilizado
// dv - visível por padrão


// export const ValueFormatters ={
//     n
// };

const fields = {
    ClassAllBulk: {},
    ClassAll: {},
    ClassCeramic: {},
    Color: {},
    ClassCore: {},
    Envelope: {},
    ClassFoam: {},
    Name: {pt: 'Nome', g: 1, fixed: 1, noNum: 1},
    Gid: {},
    HasData: {},
    IsGroup: {},
    ClassMagnetic: {},
    ClassMetal: {},
    Parent: {},
    ClassPolymer: {},
    ClassPolymerElastomer: {},
    ClassPolymerPlastic: {},
    _id: {},
    Rid: {},
    ClassStainlessAlloy: {},
    ClassToolSteel: {},
    ShortName: {},
    ClassWoods: {},
    Price: {pt: 'Preço', g: 1, n: 1, unid: ''},
    Density: {pt: 'Densidade', dv: 1, g: 1, n: 1, unid: 'kg/m^3'},
    TensileStrength: {pt: 'Resistência à Tração', dv: 1, g: 1, n: 1, unid: 'MPa'},
    YoungModulus: {pt: 'Módulo de Young', g: 1, dv: 1, n: 1, unid: ''},
    CompressiveStrength: {pt: 'Resistência à Compressão', dv: 1, g: 1, n: 1, unid: ''},
    ThermalConductivity: {pt: 'Condutividade Térmica', g: 1, n: 1, unid: ''},
    FlexuralModulus: {g: 1, n: 1, unid: '', pt: 'Módulo de Flexão'},
    ElectricalResistivity: {g: 1, n: 1, unid: '', pt: 'Resistividade Elétrica'},
    MaximumServiceTemperature: {g: 1, n: 1, unid: '', pt: 'Máxima Temperatura de Serviço'},
    ThermalExpansionCoefficient: {g: 1, n: 1, unid: '', pt: 'Coeficiente de Expansão Térmica'},
    YieldStrength: {g: 1, n: 1, unid: '', dv: 1, pt: 'Resistência ao Escoamento'},
    SpecificHeatCapacity: {g: 1, n: 1, unid: '', pt: 'Calor Específico'},
    FlexuralStrength: {g: 1, n: 1, unid: '', pt: 'Resistência à Flexão'},
    PoissonRatio: {g: 1, n: 1, unid: '', dv: 1, pt: 'Razão de Poisson'},
    ShearModulus: {g: 1, n: 1, unid: '', dv: 1, pt: 'Módulo de Cisalhamento'},
    MinimumServiceTemperature: {g: 1, n: 1, unid: '', pt: 'Mínima Temperatura de Serviço'},
    HardnessVickers: {g: 1, n: 1, unid: '', pt: 'Dureza Vickers'},
    Elongation: {g: 1, n: 1, unid: '', dv: 1, pt: 'Enlongação'},
    FractureToughness: {g: 1, n: 1, dv: 1, unid: '', pt: 'Tenacidade à Fratura'},
    FatigueStrength: {g: 1, n: 1, dv: 1, unid: '', pt: 'Resistência à Fadiga'},
    MeltingPoint: {g: 1, n: 1, unid: '', dv: 1, pt: 'Ponto de Fusão'},
    LatentHeatFusion: {},
    GalvanicPotential: {g: 1, n: 1, unid: '', pt: 'Potencial Galvânico'},
    GlassTemperature: {g: 1, n: 1, unid: '', pt: 'Temperatura de Trasição Vítrea'},
    CompressiveModulus: {g: 1, n: 1, unid: '', pt: 'Módulo de Compressão'},
    ShearStrength: {g: 1, n: 1, unid: '', pt: 'Módulo de Cisalhamento'},
    HardnessBrinell: {g: 1, n: 1, unid: '', pt: 'Dureza Brinell'},
    ImpactStrength23: {},
    MeltTemperature: {},
    PriceDelta: {},
    DensityDelta: {},
    TensileStrengthDelta: {},
    YoungModulusDelta: {},
    CompressiveStrengthDelta: {},
    ThermalConductivityDelta: {},
    FlexuralModulusDelta: {},
    ElectricalResistivityDelta: {},
    MaximumServiceTemperatureDelta: {},
    ThermalExpansionCoefficientDelta: {},
    YieldStrengthDelta: {},
    SpecificHeatCapacityDelta: {},
    FlexuralStrengthDelta: {},
    PoissonRatioDelta: {},
    ShearModulusDelta: {},
    MinimumServiceTemperatureDelta: {},
    HardnessVickersDelta: {},
    ElongationDelta: {},
    FractureToughnessDelta: {},
    FatigueStrengthDelta: {},
    MeltingPointDelta: {},
    LatentHeatFusionDelta: {},
    GalvanicPotentialDelta: {},
    GlassTemperatureDelta: {},
    CompressiveModulusDelta: {},
    ShearStrengthDelta: {},
    HardnessBrinellDelta: {},
    ImpactStrength23Delta: {},
    MeltTemperatureDelta: {},
};

export const defaultFieldList = () => {
    let flist = [];
    for (let k in fields) {
        flist.push({
            ...fields[k],
            field: k,
        });
    }
    return flist;
};

export const defaultColumns = () => {
    let flist = {};
    for (let k in fields) {
        if (fields[k].g)
            flist[k]=({
                visible: fields[k].fixed || fields[k].dv,
                fixed: fields[k].fixed,
                field: k,
            });
    }
    return flist;
};

export default fields;