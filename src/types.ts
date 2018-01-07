

/**
 * 認可: 都道府県又は政令指定市又は中核市が設置を認可した施設
 * 認証A型: 東京都による独自の設備。0~5歳児が対象
 * 認証B型: 東京都による独自の設備。0~2歳児が対象
 * 認可外:
 * 幼稚園: 3~5歳児が対象。文部科学省が管轄する教育機関
 * 認定こども園: 保育所 + 幼稚園
 *
 * cf. https://ja.wikipedia.org/wiki/保育所
 */
export type Kind = "認可" | "認証A型" | "認証B型" | "認可外" | "幼稚園" | "認定こども園";

export interface Hoikujo {
  /**
   * 名前（一意とは限らない）
   */
  name: string;

  /**
   * TODO: 郵便番号 (###-####)
   */
  postalCode?: string;

  /**
   * 都道府県名
   */
  prefecture: string;

  /**
   * 住所
   */
  address: string;


  /**
   * 電話番号
   */
  tell: string;

  /**
   * 定員
   */
  capacity: number;

  /**
   * 種別
   */
  kind?: Kind;

  /**
   * データソース（URI）
   */
  source: string;

  /**
   * 公式データの更新日
   */
  modifiedDate?: Date;
}
