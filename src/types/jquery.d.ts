/* eslint-disable @typescript-eslint/no-explicit-any */
interface JQuery {
  datepicker: any;
  selectpicker: any;
  steps: any;
  owlCarousel: any;
}

interface JQueryStatic {
  fn: {
    datepicker: {
      language: Record<string, any>;
    };
  }
} 