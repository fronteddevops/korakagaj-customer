import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJSON from './messages/en.json '
import hiJSON from './messages/hi.json'
i18n.use(initReactI18next).init({
 resources: {
  en: { ...enJSON },
  hi: { ...hiJSON },
 }, 
 lng: "en",    
});