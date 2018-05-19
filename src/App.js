import React, { Component } from 'react'
import AppNavBar from './components/appNavBar/AppNavBar.js'
import CarouselSlider from './components/carouselSlider/CarouselSlider.js'
import SocialMediaBar from './components/socialMediaBar/SocialMediaBar.js'
import CallToActionBar from './components/callToActionBar/CallToActionBar.js'
import NavTabs from './components/navTabs/NavTabs'
import AppFooter from './components/appFooter/AppFooter'
import AppJumbtron from './components/appJumbotron/AppJumbotron.js'
import CardImage from './assest/img/card-header-1.jpg'
import { getDatafromServer } from './admin-app/auth/firebase'

const Youtube = () => (
  <iframe width='100%' height='315' frameBorder='0' title='youtube' src='https://www.youtube.com/embed/G5TBWxjnaIE?rel=0&amp;controls=0' />
)

const articles = [
  {
    title: 'ارتباط الروحانيات بعضها ببعض',
    image: ''
  },
  {
    title: 'روحانيـات الإنسان*روحانيات الملائكة',
    image: CardImage
  },
  {
    title: 'روحانيات الجـــــــن*روحانيات الجمـــاد *',
    image: CardImage
  },
  {
    title: 'الروحانيات ومركزها في الإنسان',
    image: CardImage
  }
]

const JumbtronContent1 = [
  {
    title: 'تعريف الروحانيات',
    content: 'الروحانيات لها مفاهيم كثيرة ومتعددة ولكل شيء على وجه الأرض وفي الكون له روحانية وتنقسم الروحانيات إلى أجزاء كثيرة والروحانيات معناها هو الإحساس الموجود داخل الشيء نفسه المتحكم في تصرفاته ومن المعروف أن الإنسان يعتقد أن الجن اشد و أقوى منه علما بان الإنسان أقوى من الجن والدليل على ذلك قال تعالى في كتابه الحكيم عندما خاطب سيدنا سليمان عشيرته قال * بسم الله الرحمن الرحيم * قال يا أيها الملؤا',
    button: 'المزيد',
    image: ''
  },
  {
    title: 'تعريف الروحانيات فقرة٢ ',
    content: 'قال تعالى في كتابه الحكيم عندما خاطب سيدنا سليمان عشيرته قال * بسم الله الرحمن الرحيم * قال يا أيها الملؤا أيكم يأتني بعرشها قبل أن يأتونى مسلمين * قال عفريت من الجن أنا أتيك به قبل أن تقوم من مقامك وان عليه لقوى أمين * قال الذي عنده علم من الكتاب أنا أتيك به قبل أن يرتد لك طرفك فلما رآه مستقرا عنده قال هذا من فضل ربى ليبلوني ءاشكر أم اكفر ومن شكر فإنما يشكر لنفسه ومن كفر فان ربى غنى كريم * صدق الله العظيم * علما بأن الذي قال أنا أتيك بها قبل أن يرتد لك طرفك كان من الأنس ولكن الفرق بينه وبين الجن انه كان يعلم علم الكتاب وهذا أوضح دليل أن الإنسان له علم اشد من علم الجن وان الجن ليس له المقدرة على شئ مثل الإنسان وإذا كان الشيطان أقوى من الإنسان ما كان استثنى أحد من عباد الله في مخاطبته مع رب العزة حين قال * فا وعزتك و جلالك لأغوينهم ألا عبادك منهم المخلصين * وهذا أوضح دليل',
    button: 'المزيد',
    image: ''
  }
]
const JumbtronContent2 = [
  {
    title: 'ارتباط روحانية الإنسان وتآلفها مع جميع الروحانيات الأخرى',
    content: 'الروحانيات عادة ما تتحرك في الإنسان بالفكر وبالتركيز العالي في تحكم الروحانيات والإنسان الروحاني بوسعه أن يعرف ما يدور بمشاعر الأشخاص المحيطة حوله وأفكارهم وذلك لا يستطيع الجن أن يعرفه والدليل على عدم معرفة الجن ما بداخل الإنسان حينما مات سيدنا سليمان لم يعرف الجن بموته إلا بعد أن أكلت القارضة العصا فقالوا) لو علمنا الغيب ما لبثنا في هذا العذاب المهين . صدق الله العظيم ( أن الإنسان الروحاني يستطيع بروحانيته العالية وهى اشد لغة في مخاطبة الأرواح وبعضها أن يخاطب أشخاص آخرين وان هذه اللغة لا تشترط على مخاطبة البشر وبعضهم من الممكن مخاطبة الإنسان مع الحيوان لان الحيوان له روحانية',
    button: '  المزيد عن الموضوع',
    image: ''
  }
]
const JumbtronContent3 = [
  {
    title: 'الروحانيات ومركزها في الإنسان',
    content: 'الروحانيات لها مفاهيم كثيرة ومتعددة ولكل شيء على وجه الأرض وفي الكون له روحانية وتنقسم الروحانيات إلى أجزاء كثيرة والروحانيات معناها هو الإحساس الموجود داخل الشيء نفسه المتحكم في تصرفاته ومن المعروف أن الإنسان يعتقد أن الجن اشد و أقوى منه علما بان الإنسان أقوى من الجن والدليل على ذلك قال تعالى في كتابه الحكيم عندما خاطب سيدنا سليمان عشيرته قال * بسم الله الرحمن الرحيم * قال يا أيها الملؤا',
    button: 'المزيد',
    image: ''
  }
]
const JumbtronContent4 = [
  {
    title: 'المزيد في الروحانيات',
    content: 'ولكنها مجهولة لعدم عقلية الحيوان ولا يشترط الإنسان أن يكون متابعا نوعا معينا من العبادة أو يسلك سلوك غير مشروع فكل هذه الأساليب تنمى الروحانية حسب ما يسلك الإنسان . أن يكون عابدا فاتكون روحانيته شفافة وطاهرة أو يكون غير ذلك في سلوكه وقد ذكرنا أن الإنسان بطبيعته روحاني ولكن شخص تظهر علية هذه الروحانية وشخص لا تظهر عليه و من الممكن إن ينمى أي شخص روحانيته بتدريبات معينة وإذا تقرب الإنسان إلى العبادة فسوف تعلق روحانيته بروحانية الملائكة كما ذكرنا في أول الأمر أما إذا بعد عن ذلك فسوف يسير معه الشيطان ويشعره بأنه هو الذي يمن عليه بكل هذا العلم ويوجهه إلى الخير حتى يصدقه وبعد ذلك يوجهه إلى الشرور والمعاصي حتى يكفر ولا يستطيع الإنسان آن يرجع عما هو فيه لأنه يشبع رغبته بكل شئ موجود حوله *',
    button: 'المزيد',
    image: ''
  }
]
const ArticleImage = () => <img src={CardImage} alt='image1' />
const Articles = () => (
  <div>
    { articles.map(item =>
      <div className='card col-md-3'>
        <img className='card-img-top' src={CardImage} alt='Card cap' />
        <div className='card-body'>
          <p className='card-text'>{item.title}</p>
        </div>
      </div>
    )
    }
    <br />
    <hr />

  </div>
)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount () {
    getDatafromServer()
  }

  render () {
    return (
      <div className='App block'>
        <AppNavBar children={<NavTabs />} />
        <CarouselSlider />
        <CallToActionBar />
        <SocialMediaBar />
        <AppJumbtron source={JumbtronContent1} >
          <Articles />
        </AppJumbtron>
        <AppJumbtron children={<Youtube />} source={JumbtronContent2} />
        <AppJumbtron children={<ArticleImage />} source={JumbtronContent3} />
        <AppJumbtron source={JumbtronContent4} />
        <AppFooter />
      </div>
    )
  }
}

export default App
