/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import ReactNative from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import { scale } from '../Utils/Scaling';
import colors from '../Config/colors';
import Text from './Text';
import i18n from '../i18n';
import Button from './Button';

export default class Agreement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isAgreementRead: false,
      callback: undefined
    };
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

  showAgreement = ({ callback }) => {
    this.setState({ isVisible: true, callback });
  }

  agreementConfirmed = () => {
    const { callback } = this.state;
    callback();
    this.setState({ isVisible: false });
  }

  hideAgreement = () => {
    this.setState({ isVisible: false });
  }

  render() {
    const {
      isVisible, isAgreementRead
    } = this.state;
    return (
      <ReactNative.Modal
        onRequestClose={() => { }}
        visible={isVisible}
        transparent
        hardwareAccelerated
        animationType="fade"
      >
        <SafeAreaView style={styles.agreementWrapper}>
          <ReactNative.View style={styles.agreementHeader}>
            <Text style={styles.agreementHeaderText}>{i18n.t('agreement.header-title-text')}</Text>
            <ReactNative.TouchableOpacity onPress={() => { this.hideAgreement(); }}>
              <Icon name="closecircleo" size={scale(50)} style={styles.closeAgreementButton} />
            </ReactNative.TouchableOpacity>
          </ReactNative.View>
          <ReactNative.View style={styles.agreementScrollWrapper}>
            <ReactNative.ScrollView
              contentContainerStyle={styles.agreementContainer}
              onScroll={({ nativeEvent }) => {
                if (this.isCloseToBottom(nativeEvent)) {
                  this.setState({ isAgreementRead: true });
                }
              }}
              scrollEventThrottle={400}
            >
              <Text>
                <Text style={styles.agreementSubHeader}>1. Taraflar</Text>
                {'\n\n'}
                <Text style={styles.lawNo}>a)</Text>
                {' '}
                www.limasolonline.com internet sitesinin faaliyetlerini yürüten Dr. Salih Miroğlu Caddesi Gönen Sokak, Hilarion 1 Apt. Girne/KKTC adresinde Wide-Area Payment Systems Ltd.
                {'\n\n'}
                <Text style={styles.lawNo}>b)</Text>
                {' '}
                www.limasolonline.com internet sitesine üye olan internet kullanıcısı (Üye)
                {'\n\n'}
                <Text style={styles.agreementSubHeader}>2. Sözleşmenin Konusu</Text>
                {'\n\n'}
                İşbu Sözleşme’nin konusu. www.limasolonline.com internet sitesinden ve mobil aplikasyondan Üye’nin kullanma ve yararlanma şartları ile tarafların hak ve yükümlülüklerinin belirlenmesidir.
                {'\n\n'}
                <Text style={styles.agreementSubHeader}>3. Tarafların Hak ve Yükümlülükleri</Text>
                {'\n\n'}
                <Text style={styles.lawNo}>3.1.</Text>
                {' '}
                Üye. www.limasolonline.com internet sitesine veya mobil aplikasyona üye olurken verdiği kişisel ve diğer sair bilgilerin kanunlar önünde doğru olduğunu. Wide-Area Payment Systems Ltd. ’in bu bilgilerin gerçeğe aykırılığı nedeniyle uğrayacağı tüm zararları aynen ve derhal tazmin edeceğini beyan ve taahhüt eder. www.limasolonline.com internet sitesine veya mobil aplikasyonuna üye olmak için 18 yaşından büyük olmak gerekir. Üye olan herkes 18 yaşından büyük olduğunu taahhüt eder. 18 yaşından küçük olduğu sonradan tespit edilen kullanıcıların üyeliği iptal edilir. Ayrıca. bilgilerin doğru olmadığı açık bir şekilde belli olan durumlarda  Wide-Area Payment Systems Ltd. bu üyenin üyeliğini iptal edebilir.
                {'\n\n'}
                <Text style={styles.lawNo}>3.2.</Text>
                {' '}
                Wide-Area Payment Systems Ltd . Üye’nin www. limasolonline.com internet sitesi veya mobil aplikasyon üyelik hakkını  Wide-Area Payment Systems Ltd ’in çıkarlarına ters biçimde işbu sözleşmeye ve/veya hukuka aykırı kullandığı kanaatine varacak olursa. herhangi bir ihbara gerek olmaksızın Üye’nin üyeliğini iptal edebilir.
                {'\n\n'}
                <Text style={styles.lawNo}>3.3.</Text>
                {' '}
                Wide-Area Payment Systems Ltd . Üye’nin www. limasolonline.com internet sitesine veya mobil aplikasyona erişebilmesi ve Site’de sunulan hizmetlerden faydalanabilmesi için her bir ilk kayıt aşamasın da bir şifre oluşturmak zorundadır. . Üye  bu şifreyi başka kişi ya da kuruluşa veremez. üyenin söz konusu şifreyi kullanma hakkı bizzat kendisine aittir.Kullanıcı Adı ve Şifre kullanılarak Site’ye girilmesi halinde  Wide-Area Payment Systems Ltd . Site’ye giriş yapan kişinin işbu Sözleşme kapsamında Üyelik’i kullanmaya yetkili olduğunu kabul eder. Wide-Area Payment Systems Ltd. ’in yapılan girişlerin kaynağını ve yetkisini araştırma yükümlülüğü bulunmamaktadır. Üyelik bilgilerinin üçüncü kişiler tarafından ele geçirilmesi halinde Site’de yapılan işlemlerden doğabilecek sonuçlar açısından   Wide-Area Payment Systems Ltd her ne nam adı altında olursa olsun hiç bir sorumluluk kabul etmemektedir. Kullanıcı Adı ve/veya Şifresi’nin tehdit altında olması ve/veya çalınması halinde Üye. Wide-Area Payment Systems Ltd. ’e bu hususu bildirmekle yükümlüdür.
                {'\n\n'}
                <Text style={styles.lawNo}>3.4.</Text>
                {' '}
                Üye. www. limasolonline.com internet sitesi veya mobil aplikasyon üzerinden sadece kendi kredi kartı ile ödeme yapmayı kabul ve taahhüt eder. Üye. www. limasolonline.com internet sitesi üzerinden kredi kartı ile 3 boyutlu güvenlik (3D Secure) sistemi çerçevesinde güvenli ödeme yapabilecektir. Üye. Kullanıcı Adı ve Şifresi ile www. limasolonline.com internet sitesine giriş yapması ve 3 boyutlu güvenlik (3D Secure) sistemi çerçevesinde kredi kartı şifresini girmesi ve/veya bankası tarafından cep telefonuna gönderilen tek kullanımlık SMS mesajındaki şifreyi girmesi ile ödemenin gerçekleşmesi durumunda.   Wide-Area Payment Systems Ltd. ’in bu işlemle ilgili hiçbir sorumluluğunun kalmayacağını ve bu işlemle ilgili Wide-Area Payment Systems Ltd. ’den herhangi bir talebinin olmayacağını kabul ve taahhüt eder.
                {'\n\n'}
                <Text style={styles.lawNo}>3.5.</Text>
                {' '}
                Üye. www. limasolonline.com internet sitesi veya mobil aplikasyonu kullanırken yasal mevzuat hükümlerine riayet etmeyi ve bunları ihlal etmemeyi baştan kabul ve taahhüt eder. Sitenin veya mobil aplikasyonun işlemez hale gelmesini ciddi ölçüde yavaşlamasını veya yazılım ve donanım sistemlerinin zarar görmesini amaçlayan her türlü davranış ve işlem yasaktır. Otomatik programlar kullanılarak çok sayıda sorgu veya üyelik kaydı yapılması veya otomatik yöntemlerle siteye çok sayıda talep veya bilgi gönderilmesi de bu yasağa dahildir. www. limasolonline.com bu gibi faaliyetlerde bulunduğunu tespit ettiği üyenin siteye erişimini engelleme, üyeliğini iptal etme ve yasal işlem başlatma hakkına sahiptir ve doğacak tüm hukuki ve cezai yükümlülükler tamamen ve münhasıran üyeyi bağlayacaktır.
                {'\n\n'}
                <Text style={styles.lawNo}>3.6.</Text>
                {' '}
                Üye. www. limasolonline.com internet sitesi veya mobil aplikasyonu hiçbir şekilde kamu düzenini bozucu genel ahlaka aykırı başkalarını rahatsız ve taciz edici şekilde ülke çapında ya da uluslararası düzeyde yasalara aykırı bir amaç için başkalarının fikri ve telif haklarına tecavüz edecek şekilde kullanamaz. Almakta olduğu hizmetleri üçüncü şahısların kullanımına sunamaz. Kiralama veya satışa arz etme gibi ticari faaliyetlere konu edemez. Ayrıca üye başkalarının hizmetleri kullanmasını önleyici veya zorlaştırıcı faaliyet (spam. virüs. truva atı vb.) ve işlemlerde bulunamaz.
                {'\n\n'}
                <Text style={styles.lawNo}>3.7.</Text>
                {' '}
                Üye diğer internet kullanıcılarının yazılımlarına ve verilerine izinsiz olarak ulaşmamayı veya bunları kullanmamayı kabul etmiştir. Aksi takdirde bundan doğacak hukuki ve cezai sorumluluklar tamamen üyeye aittir.
                {'\n\n'}
                <Text style={styles.lawNo}>3.8.</Text>
                {' '}
                İşbu üyelik sözleşmesi içerisinde sayılan maddelerden bir ya da birkaçını ihlal eden üye işbu ihlal nedeniyle cezai ve hukuki olarak şahsen sorumlu olup. Wide-Area Payment Systems Ltd. ’i bu ihlallerin hukuki ve cezai sonuçlarından ari tutacaktır. Ayrıca; işbu ihlal nedeniyle olayın hukuk alanına intikal ettirilmesi halinde. Wide-Area Payment Systems Ltd. ’in üyeye karşı üyelik sözleşmesine uyulmamasından dolayı tazminat talebinde bulunma hakkı saklıdır.
                {'\n\n'}
                <Text style={styles.lawNo}>3.9.</Text>
                {' '}
                Wide-Area Payment Systems Ltd. ’in her zaman hiçbir ihbara ve hiçbir gerekçe göstermeye gerek olmadan ve tek taraflı olarak işbu sözleşmeyi feshederek üyenin üyeliğini silme ve iptal etme hakkı vardır. Üye işbu tasarrufu önceden kabul eder. Bu durumda Wide-Area Payment Systems Ltd. ’in hiçbir tazminat vb. sorumluluğu yoktur.
                {'\n\n'}
                <Text style={styles.lawNo}>3.10.</Text>
                {' '}
                Wide-Area Payment Systems Ltd. . www. limasolonline.com internet sitesinin hatasız olması için her türlü tedbiri almıştır. Bununla birlikte sitede mevcut ya da oluşabilecek hatalar ile ilgili herhangi bir garanti verilmemektedir.
                {'\n\n'}
                <Text style={styles.lawNo}>3.11.</Text>
                {' '}
                Wide-Area Payment Systems Ltd. .www. limasolonlie.com  internet sitesi veya maobil aplikasyonundaki herhangi bir görüntüyü veya özelliği bunlarla kısıtlı olmamak üzere Site'deki tüm değişken ve/veya varsayılan ayarların hepsini ve/veya bir kısmını Üye'ye bildirmeksizin istediği zaman değiştirme veya tümüyle ortadan kaldırma hakkını saklı tutar.
                {'\n\n'}
                <Text style={styles.lawNo}>3.12.</Text>
                {' '}
                www. limasolonline.com internet sitesinde yer alan bunları içeren ama bunlarla sınırlı olmayan tüm malzeme ve dokümanlar Wide-Area Payment Systems Ltd.’in  mülkiyetinde olup, bu malzeme ve dokümanlara ilişkin telif hakkı ve/veya diğer fikri mülkiyet hakları ilgili kanunlarca korunmakta olup. bu malzemeler ve dokümanlar üye tarafından izinsiz kullanılamaz, iktisap edilemez ve değiştirilemez. Bu web sitesinde adı geçen başkaca şirketler ve ürünleri sahiplerinin ticari markalarıdır ve ayrıca fikri mülkiyet hakları kapsamında korunmaktadır.
                {'\n\n'}
                <Text style={styles.lawNo}>3.13.</Text>
                {' '}
                Üye işbu sözleşmeyi ve üyelik hakkını kısmen veya tamamen üçüncü kişilere devredemez. Üyenin yapacağı her tür devir işlemi geçersiz sayılır.
                {'\n\n'}
                <Text style={styles.lawNo}>3.14.</Text>
                {' '}
                Wide-Area Payment Systems Ltd. tarafından www. limasolonline.com internet sitesinin iyileştirilmesi, geliştirilmesine yönelik olarak ve/veya yasal mevzuat çerçevesinde siteye erişmek için kullanılan internet servis sağlayıcısının adı ve Internet Protokol (IP) adresi, siteye erişilen tarih ve saat, sitede bulunulan sırada erişilen sayfalar ve siteye doğrudan bağlanılmasını sağlayan web sitesinin internet adresi gibi birtakım bilgiler toplanabilir.
                {'\n\n'}
                <Text style={styles.lawNo}>3.15.</Text>
                {' '}
                Üye Wide-Area Payment Systems Ltd. tarafından ürün ve hizmet tanıtımları, reklamlar, kampanyalar, avantajlar, anketler ve diğer müşteri memnuniyeti uygulamaları hakkında kendisine e-mail, telefon, sms, vb. yollarla bilgi ve ilanlar gönderilmesine izin verdiğini beyan ve kabul eder. Üye. www. limasolonline.com internet sitesine üye olurken ve site üzerinden işlem yaparken vermiş olduğu ve/veya gelecekte vereceği kişisel ve alışveriş/fatura bilgilerinin ve/veya tüketici davranış bilgilerinin toplanmasına. bu bilgilerin   Wide-Area Payment Systems Ltd. ile Wide-Area Payment Systems Ltd ’in iş ortakları, tedarikçileri ve ilişkide bulunduğu bankalar tarafından kayda alınabilmesine, saklanabilmesine, işlenebilmesine, kullanılabilmesine ve paylaşılabilmesine izin verdiğini beyan ve kabul eder. Üye aksini bildirmediği sürece üyeliği sona erdiğinde de kişisel ve alışveriş/fatura bilgileri verilerinin yukarıda belirtilen şekil ve kapsamda kullanılmasına izin verdiğini beyan ve kabul eder. Üye. yukarıda bahsi geçen bilgilerin toplanması, paylaşılması, kullanılması, arşivlenmesi ve kendisine erişilmesi nedeniyle doğrudan ve/veya dolaylı maddi ve/veya manevi menfi ve/veya müsbet. kısaca herhangi bir zarara uğradığı konusunda talepte bulunmayacağını ve Wide-Area Payment Systems Ltd. ’i sorumlu tutmayacağını kabul ve beyan eder. Üye. veri paylaşım tercihlerini değiştirmek isterse. bu talebini her zaman   Wide-Area Payment Systems Ltd ’e iletebilir.
                {'\n\n'}
                <Text style={styles.lawNo}>3.16.</Text>
                {' '}
                www. limasolonline.com web sitesinin virüs ve benzeri amaçlı yazılımlardan arındırılmış olması için mevcut imkanlar dahilinde tedbir alınmıştır. Bunun yanında nihai güvenliğin sağlanması için kullanıcının, kendi virüs koruma sistemini tedarik etmesi ve gerekli korunmayı sağlaması gerekmektedir. Bu bağlamda üye www. limasolonline.com web sitesine girmesiyle, kendi yazılım ve işletim sistemlerinde oluşabilecek tüm hata ve bunların doğrudan ya da dolaylı sonuçlarından kendisinin sorumlu olduğunu kabul etmiş sayılır.
                {'\n\n'}
                <Text style={styles.lawNo}>3.17.</Text>
                {' '}
                Wide-Area Payment Systems Ltd.’e . sitenin içeriğini dilediği zaman değiştirme, kullanıcılara sağlanan herhangi bir hizmeti değiştirme ya da sona erdirme veya www. limasolonline.com web sitesinde kayıtlı kullanıcı bilgi ve verilerini silme hakkını saklı tutar.
                {'\n\n'}
                <Text style={styles.lawNo}>3.18.</Text>
                {' '}
                Wide-Area Payment Systems Ltd.’in  üyelik sözleşmesinin koşullarını hiçbir şekil ve surette ön ihbara ve/veya ihtara gerek kalmaksızın her zaman değiştirebilir, güncelleyebilir veya iptal edebilir. Değiştirilen, güncellenen ya da yürürlükten kaldırılan her hüküm yayın tarihinde tüm üyeler bakımından hüküm ifade edecektir.
                {'\n\n'}
                <Text style={styles.lawNo}>3.19.</Text>
                {' '}
                Taraflar. Wide-Area Payment Systems Ltd. ’e ait tüm bilgisayar kayıtlarının tek ve gerçek münhasır delil olarak, kanuna uygun şekilde esas alınacağını ve söz konusu kayıtların bir delil sözleşmesi teşkil ettiği hususunu kabul ve beyan eder.
                {'\n\n'}
                <Text style={styles.agreementSubHeader}>4. Sözleşmenin Feshi</Text>
                {'\n\n'}
                İşbu sözleşme üyenin üyeliğini iptal etmesi veya  Wide-Area Payment Systems Ltd. tarafından üyeliğinin iptal edilmesine kadar yürürlükte kalacaktır.
                {'\n\n'}
                <Text style={styles.agreementSubHeader}>5. İhtilafların Halli</Text>
                {'\n\n'}
                İşbu sözleşmeye ilişkin ihtilaflarda KKTC Mahkemeleri ve İcra Daireleri yetkilidir.
                {'\n\n'}
                <Text style={styles.agreementSubHeader}>6. Yürürlük</Text>
                {'\n\n'}
                Üyenin üyelik kaydı yapması üyenin üyelik sözleşmesinde yer alan tüm maddeleri okuduğu ve üyelik sözleşmesinde yer alan maddeleri kabul ettiği anlamına gelir. İşbu Sözleşme üyenin üye olması anında akdedilmiş ve karşılıklı olarak yürürlüğe girmiştir.
              </Text>
            </ReactNative.ScrollView>
          </ReactNative.View>
          <ReactNative.View style={styles.confirmAgreementButtonContainer}>
            <Button style={{ ...styles.confirmAgreementButton, backgroundColor: isAgreementRead ? colors.secondary : colors.light }} buttonText={i18n.t('agreement.confirm-button-placeholder')} onPress={() => { this.agreementConfirmed(); }} disabled={!isAgreementRead} />
          </ReactNative.View>
        </SafeAreaView>
      </ReactNative.Modal>
    );
  }
}

const styles = ReactNative.StyleSheet.create({
  agreementWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin: scale(15)
  },
  agreementScrollWrapper: {
    flex: 0.5,
    backgroundColor: colors.white,
    borderRightColor: colors.dark,
    borderLeftColor: colors.dark,
    borderRightWidth: 1,
    borderLeftWidth: 1
  },
  agreementContainer: {
    flexGrow: 1,
    padding: scale(20)
  },
  agreementSubHeader: {
    fontWeight: 'bold',
    fontSize: scale(25),
    textAlign: 'center'
  },
  lawNo: {
    fontWeight: 'bold'
  },
  agreementHeader: {
    flexDirection: 'row',
    backgroundColor: colors.orange,
    justifyContent: 'space-between',
    borderColor: colors.dark,
    borderWidth: 1
  },
  agreementHeaderText: {
    fontWeight: '500',
    fontSize: scale(30),
    margin: scale(20),
    alignSelf: 'center'
  },
  closeAgreementButton: {
    color: colors.dark,
    margin: scale(20)
  },
  confirmAgreementButtonContainer: {
    backgroundColor: colors.white,
    borderRightColor: colors.dark,
    borderLeftColor: colors.dark,
    borderBottomColor: colors.dark,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1
  },
  confirmAgreementButton: {
    marginLeft: scale(20),
    marginRight: scale(20)
  }
});
