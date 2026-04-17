const ProductShippingInfo = () => {
  return (
    <div className="shipping-info">
      <h5>Умови оплати та доставки</h5>
      <h6>Способи доставки</h6>
      <ul>
        <li>Доставка &quot;Нова Пошта&quot;</li>
        <li>Доставка &quot;Самовивіз&quot;</li>
        <li>Делівері</li>
      </ul>
      <hr className="input-line" />
      <h6>Способи оплати</h6>
      <ul>
        <li>Післяплата &quot;Нова Пошта&quot;</li>
        <li>Оплата за реквізитами</li>
        <li>Готівкою</li>
      </ul>
    </div>
  );
};

export default ProductShippingInfo;
