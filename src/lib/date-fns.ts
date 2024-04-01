import { enUS, ptBR } from 'date-fns/locale';
import { Locale, format as dateFormat } from 'date-fns';

import i18n from '@/languages/i18n';

interface Locales {
  [key: string]: Locale;
}

const getDateLocale = (): Locale => {
  const locales: Locales = {
    pt_BR: ptBR,
    en: enUS,
  };

  return locales[i18n.language];
};

const formatDate = (date: string|number|Date, format: string) => dateFormat(date, format, { locale: getDateLocale() });

export { getDateLocale, formatDate as format };