import React from 'react';
import styled from '@emotion/styled';

function App() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          style={{
            width: 500,
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
            }}
          >
            <div>{tender.risk}</div>
            <div>Riesgo</div>
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
    `images/PPC_PROCESO_19-21-10415_215469012_57977651-` + offset + i
  );
}
