import './index.css';
import React from 'react';
import StartButton from '../../components/StartButton';
import Footer from '../../components/Oganisms/Footer';
import { useNavigate } from 'react-router-dom';

const TopPage = () => {
  const navigate = useNavigate();
  const goNextPage = () => {
    navigate('/diagnosis')
  }
  return (
    <>

      <div className="App">
        
        <header></header>
        
        <div className='Top'>
          <div className="Top_title">
            <h1>ソーシャルスタイル診断</h1>
            <h3>Cheer Career</h3>
          </div>
          
          <div className='startButton-1'>
            <StartButton onClick={goNextPage} />
          </div>
        </div>
        
        <main>
          <section className='explanation'>
            <div className="exp_title">
                <h2 className='exp_title_txt01'>ソーシャルスタイルって</h2>
                <h2 className='exp_title_txt02 emphasis'>ナニ？</h2>
            </div>
            <div className="exp_txt">
              <p>ソーシャルスタイルとは1968年にアメリカの産業心理学者であるデビッド・メリル氏が提唱した<span className='emphasis'>コミュニケーション</span>の理論です</p>
              <p>人の言動を4つのスタイルに分けて分析し、<span className='emphasis'>相手が望ましいと感じる対応を探し、選択する方法</span>として活用されています</p> 
              <p>人の言動を単純に4つに分けることはできませんが、大まかな方向性としていずれかのスタイルに分類されるといわれています。</p>  
            </div>             
          </section>
          
          <section className="graph_area">
            <div className='graph'>
              <div class="graph_top">
                <div class="graph_elem tl">
                  <div className="tl_txt emphasis center_txt">
                    <p className='graph_txt_p'>アナリティカル</p>
                    <h3 className='graph_txt_h3'>Analytical</h3>
                  </div>
                </div>
                <div class="graph_elem tr">
                  <div className="tr_txt emphasis center_txt">
                    <p className='graph_txt_p'>ドライバー</p>
                    <h3 className='graph_txt_h3'>Driver</h3>
                  </div>
                </div>
              </div>
              <div class="graph_btm">
                <div class="graph_elem bl">
                  <div className="bl_txt emphasis center_txt">
                    <p className='graph_txt_p'>エミアブル</p>
                    <h3 className='graph_txt_h3'>Amiable</h3>
                  </div>
                </div>
                <div class="graph_elem br">
                  <div className="br_txt emphasis center_txt">
                    <p className='graph_txt_p'>エクスプレッシブ</p>
                    <h3 className='graph_txt_h3'>Expressive</h3>
                  </div>
                </div>
              </div>

              <div class="triangle t_top"></div>
              <div class="triangle t_right"></div>
              <div class="triangle t_bottom"></div>
              <div class="triangle t_left"></div>
            </div>
          </section>

          <div className='startButton-2'>
            <StartButton onClick={goNextPage} />
          </div>

          <div className='help'>
            <p>こんなお悩みの<span className='emphasis'>手助け</span>になるかも！？</p>
          </div>

          <div className='donNkow'>
            <div className='howWork'>
              <div className='bou'></div>
              <p className='aaa'>どんな仕事が向いているのか分からない</p>
            </div>
            <p className='bbb'>この診断では、その性格の方が「一般的に向いている仕事」を知ることが出来ます。
              それをもとにインターンや説明会に参加すれば、本当に自分に合った仕事・企業に出会えるかも？？</p>
            <p className='intern'>インターン・説明会を探す→</p>
          </div>

          <div className='relationship'>
            <div className='howWork'>
              <div className='bou'></div>
              <p className='aaa'>人間関係が上手くいかない</p>
            </div>
            <p className='bbb'>この診断では、その性格と相性が良くないタイプと、そのタイプとの上手な付き合い方を知ることが出来ます。
              そのタイプの特性を知ることで、人間関係を良好な状態に保つ努力をすることができます。</p>
          </div>

          <div className='backToTop'>
            <div className='maru'><div className='sannkaku'></div></div>
          </div>

          <div className='startButton-3'>
            <StartButton onClick={goNextPage} />
          </div>
        </main>
        <Footer />
      </div>
      
    </>
  );
}

export default TopPage;
