import React from 'react';
import styled from '@emotion/styled';

function App() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          style={{
            margin: '20px 20px 50px 20px',
            width: 400,
            height: 'auto',
          }}
          src={require('./assets/logo-black.png')}
          alt="logo Licimatic"
        />
      </div>
      <div style={{ width: '100%', display: 'flex' }}>
        <div
          style={{
            width: '50%',
          }}
        >
          {tenderImages.map(image => (
            <div
              style={{
                margin: 20,
              }}
            >
              <img
                style={{
                  width: 400,
                  heigh: 'auto',
                  border: '1px solid black',
                }}
                src={image}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            width: '50%',
          }}
        >
          <div>{tender.name}</div>
          <div>{tender.company}</div>
          <div>{tender.city}</div>
          <div>{tender.value}</div>
          <div
            style={{
              width: 70,
              color: riskColorMap[tender.riskState],
              display: 'flex',
            }}
          >
            {tender.risk} Riesgo
          </div>
          <div>
            {Object.entries(tender.discoveryTopics).map(
              ([name, summary], idx) => (
                <Topic key={idx} name={name} summary={summary} />
              )
            )}
          </div>
          <div>
            <Button>Presentarme</Button>
            {tender.riskState !== 'low' && <Button>Denunciar</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function getRiskState(risk) {
  if (risk < 30) {
    return 'low';
  } else if (risk < 70) {
    return 'medium';
  } else {
    return 'high';
  }
}

const riskColorMap = {
  high: '#FF1616',
  medium: '#E9ED00',
  low: '#2BA400',
};

const palette = {
  textDefault: '#333333',
};

const Button = styled.button({
  padding: 10,
  background: 'none',
  border: 'none',
});

const Topic = ({ name, summary }) => {
  const [selected, setSelected] = React.useState(false);

  return (
    <div
      style={{
        margin: 20,
      }}
      onClick={() => setSelected(!selected)}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            border: '2px solid grey',
            borderRadius: '50%',
            backgroundColor: selected ? 'white' : 'grey',
            transition: 'background-color .3s',
            cursor: 'pointer',
            marginRight: 10,
          }}
        />
        {name}
      </div>
      {selected && (
        <div
          style={{
            margin: 15,
          }}
        >
          {summary}
        </div>
      )}
    </div>
  );
};

const tender = {
  id: 3,
  name: 'Alimentos para poblaciones vulnerables',
  city: 'Bogotá D.C.',
  company: 'Odebrecht',
  risk: 95,
  value: "19'500.000.000",
};

tender.riskState = getRiskState(tender.risk);

const tenderImages = [];

for (let i = 1; i <= 150; i++) {
  var offset;
  if (i < 10) {
    offset = '00';
  } else if (i < 100) {
    offset = '0';
  } else {
    offset = '';
  }
  tenderImages.push(
    `images/PPC_PROCESO_19-21-10415_215469012_57977651-` + offset + i + '.jpg'
  );
}

tender.discoveryTopics = {
  'EXPERIENCIA DEL PROPONENTE':
    'La experiencia (E) del oferente para propósitos de la Capacidad Residual es acreditada por medio de la construcción inscritos por el proponente en el RUP en el segmento 72 “Servicios de Edificación, Construcción de Instalaciones y Mantenimiento” del Clasificador de Bienes y Servicios; y (ii) el presupuesto oficial estimado del Proceso de Contratación. La relación indica el número de veces que el proponente ha ejecutado contratos equivalentes a la cuantía del Proceso de Contratación objeto de la acreditación de la Capacidad Residual. La siguiente fórmula describe lo anterior. Experiencia= Valor total de contratos rup (COP)________ (Presupuesto oficial estimado * % de Participación El cálculo de del factor de experiencia (E) para efectos de la Capacidad Residual de un miembro de un oferente plural debe tener en cuenta su participación en el Proceso de Contratación objeto del cálculo de la Capacidad Residual. Si el oferente no es plural no hay lugar a porcentaje',
  'GARANTIA DE SERIEDAD DE LA OFERTA':
    'El proponente debe garantizar la seriedad de su oferta con la presentación de la garantía de seriedad expedida por compañía de seguros legalmente establecida en Colombia. La cual debe contener la siguiente información: Beneficiario: MUNICIPIO DE NOBSA NIT. 891.855.222-0 Afianzado: El oferente. Si quien presenta la oferta es un consorcio o unión temporal, deben aparecer los nombres de sus integrantes, la garantía de seriedad de la propuesta deberá ser expedida a nombre del consorcio o unión temporal, incluyendo a cada uno de sus integrantes y su porcentaje de participación. Los nombres deben figurar completos, tal como aparezcan en el certificado de la Cámara de Comercio. Vigencia: Cuatro (4) meses contados a partir de la fecha límite para presentar ofertas. Objeto: Describir la totalidad del objeto de esta convocatoria. Cuantía: 10% del valor del presupuesto oficial.',
  'INDICE DE LIQUIDEZ': 'índice de Liquidez Mayor o igual a 2.10',
  'NIVEL DE ENDEUDAMIENTO': 'Índice de Liquidez Mayor o igual a 2.10',
  'RAZÓN DE COBERTURA DE INTERESES':
    'Razón de Cobertura de Intereses Mayor o igual a 3.04',
  'RENTABILIDAD SOBRE PATRIMONIO':
    'Rentabilidad del Patrimonio Mayor o igual a 0,09 R',
  'RENTABILIDAD SOBRE ACTIVOS': 'Rentabilidad del Activo Mayor o igual a 0,05',
  'CUMPLIMIENTO, MULTAS Y CLAUSULA PENAL PECUNIARIA':
    'cumplimiento del contrato Por el termino de ejecución del contrato y 6 meses mas 20% del valor total del Contrato. Este amparo cubre a EL MUNICIPIO Estatal de los perjuicios derivados de: (a) el incumplimiento total o parcial del contrato, cuando el incumplimiento es imputable al contratista; (b) el cumplimiento tardío o defectuoso del contrato, cuando el incumplimiento es imputable al contratista; (c) los daños imputables al contratista por entregas parciales de la obra, cuando el contrato no prevé entregas parciales; y (d) el pago del valor de las multas y de la cláusula penal pecuniaria',
  'CALIDAD DE LOS SERVICIOS PRESTADOS':
    'Estabilidad y calidad de la obra Por una vigencia de cinco años contados a partir de la suscripción del acta de recibo definitivo de la obra. 30% del valor del Contrato Este amparo cubre a EL MUNICIPIO Estatal de los per-juicios ocasionados por cualquier tipo de daño o deterioro, imputable al contratista, sufrido por la obra entregada a satisfacción.',
  'PAGO DE SALARIOS, PRESTACIONES SOCIALES E INDEMNIZACIONES LABORALES':
    'Pago de salarios y prestaciones sociales e indemnizaciones Por el Plazo de ejecución del contrato y Tres (03) Años más contados a partir del acta de recibo final 10% del Valor del Contrato. Este amparo debe cubrir a EL MUNICIPIO Estatal de los perjuicios ocasionados por el incumplimiento de las obligaciones laborales del contratista derivadas de la contratación del personal utilizado en el territorio nacional para la ejecución del contrato amparado.',
  'GARANTIA DE RESPONSABILIDAD CIVIL EXTRACONTRACTUAL':
    'Responsabilidad Civil Extracontractual Plazo de ejecución del contrato Por la suma de 200 SMMLV en aquellos en que por su objeto o naturaleza lo considere necesario con ocasión de los Riesgos del contrato, el otorgamiento de una póliza de responsabilidad civil extracontractual que la proteja de eventuales reclamaciones de terceros derivadas de la responsabilidad extracontractual que surja de las actuaciones, hechos u omisiones de su contratista. EL MUNICIPIO Estatal debe exigir que la póliza de responsabilidad extracontractual cubra también los perjuicios ocasionados por eventuales reclamaciones de terceros derivadas de la responsabilidad extracontractual que surjan de las actuaciones, hechos u omisiones de los subcontratistas autorizados o en su defecto, que acredite que el subcontratista cuenta con un seguro propio con el mismo objeto y que EL MUNICIPIO Estatal sea el asegurado.',
};
