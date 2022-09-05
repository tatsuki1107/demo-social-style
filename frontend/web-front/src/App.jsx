import './App.css';
import React from 'react';
import StartButton from './components/StartButton';

const App = () => {
  return (
    <div className="App">
      <p>Header Component!!</p>

      <div className='backImg'>
        <div className='startButton-1'>
          <StartButton />
        </div>
      </div>

      <div className='explanation'>
        <p>ソーシャルスタイルって<span className='emphasis'>ナニ？</span></p>

        <p>ソーシャルスタイルとは11968年にアメリカの産業心理学者であるデビッド・メリル氏が提唱した<span className='emphasis'>コミュニケーション</span>コミュニケーションの理論です。
          人の言動を4つのスタイルに分けて分析し、<span className='emphasis'>相手が望ましいと感じる対応を探し、選択する方法</span>として活用されています。

          人の言動を単純に4つに分けることはできませんが、大まかな方向性としていずれかのスタイルに分類されるといわれています。</p>
      </div>

      <div className='graph'>
        <div class="graf_top">
          <div class="graf_elem tl"><div class="background_tl"></div></div>
          <div class="graf_elem tr"><div class="background_tr"></div></div>
        </div>
        <div class="graf_btm">
          <div class="graf_elem bl"><div class="background_bl"></div></div>
          <div class="graf_elem br"><div class="background_br"></div></div>
        </div>
        <div class="triangle t_top"></div>
        <div class="triangle t_right"></div>
        <div class="triangle t_bottom"></div>
        <div class="triangle t_left"></div>
      </div>

    </div>
  );
}

export default App;
