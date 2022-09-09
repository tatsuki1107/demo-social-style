import './index.css';
import React from 'react';
import StartButton from '../../components/StartButton';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const TopPage = () => {
  const navigate = useNavigate();
  const goNextPage = () => {
    navigate('/diagnosis')
  }
  return (
    <>
      <div className="App">
        <p>Header Component!!</p>

        <div className='backImg'>
          <div className='startButton-1'>
            <StartButton onClick={goNextPage} />
          </div>
        </div>

        <div className='explanation'>
          <p>ソーシャルスタイルって<span className='emphasis'>ナニ？</span></p>

          <p>ソーシャルスタイルとは11968年にアメリカの産業心理学者であるデビッド・メリル氏が提唱した<span className='emphasis'>コミュニケーション</span>の理論です。
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

      </div>
      <Footer />
    </>
  );
}

export default TopPage;
