import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../constants/const";
import Header from "../components/Header";
import "../styles/inventory.css";

const Inventory = () => {
  const [data, setData] = useState<any>([]);

  const ListProducts = async () => {
    await axios
      .get(URL)
      .then((response: any) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // create process
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [referencia, setReferencia] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState<any>();
  const [precio, setPrecio] = useState<any>();
  const [peso, setPeso] = useState<any>();

  const createProduct = async () => {
    var f = new FormData();
    f.append("nombre", name);
    f.append("referencia", referencia);
    f.append("precio", precio);
    f.append("categoria", categoria);
    f.append("stock", stock);
    f.append("peso", peso);
    f.append("METHOD", "POST");
    await axios
      .post(URL, f)
      .then((response) => {
        setData(data.concat(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //update process
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [nameUpdate, setNameUpdate] = useState("");
  const [referenciaUpdate, setReferenciaUpdate] = useState("");
  const [categoriaUpdate, setCategoriaUpdate] = useState("");
  const [stockUpdate, setStockUpdate] = useState<any>();
  const [precioUpdate, setPrecioUpdate] = useState<any>();
  const [pesoUpdate, setPesoUpdate] = useState<any>();
  const [id_producto, setId_producto] = useState();

  const updateHandler = async (
    id_producto: any,
    name: string,
    referencia: string,
    precio: number,
    categoria: string,
    stock: number,
    peso: number
  ): Promise<void> => {
    setId_producto(id_producto);
    setNameUpdate(name);
    setReferenciaUpdate(referencia);
    setPrecioUpdate(precio);
    setCategoriaUpdate(categoria);
    setStockUpdate(stock);
    setPesoUpdate(peso);
    await setOpenModalUpdate(!openModalUpdate);
  };

  const updateProduct = async () => {
    var f = new FormData();
    f.append("nombre", nameUpdate);
    f.append("referencia", referenciaUpdate);
    f.append("precio", precioUpdate);
    f.append("categoria", categoriaUpdate);
    f.append("stock", stockUpdate);
    f.append("peso", pesoUpdate);
    f.append("METHOD", "PUT");
    await axios
      .post(URL, f, { params: { id: id_producto } })
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((producto: any) => {
          if (producto.id_producto === id_producto) {
            producto.nombre = nameUpdate;
            producto.referencia = referenciaUpdate;
            producto.precio = precioUpdate;
            producto.categoria = categoriaUpdate;
            producto.stock = stockUpdate;
            producto.peso = pesoUpdate;
            setData(dataNueva);
          } else {
            setData(dataNueva);
          }
        });
        setData(dataNueva);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //sell process

  const [cantidad, setCantidad] = useState<any>();
  const [venta, setVenta] = useState<any>();
  const [openModalSell, setOpenModalSell] = useState(false);

  const sellHandler = async (
    id_producto: any,
    name: string,
    referencia: string,
    precio: number,
    categoria: string,
    stock: number,
    peso: number,
    venta: number
  ): Promise<void> => {
    setId_producto(id_producto);
    setNameUpdate(name);
    setReferenciaUpdate(referencia);
    setPrecioUpdate(precio);
    setCategoriaUpdate(categoria);
    setStockUpdate(stock);
    setPesoUpdate(peso);
    setVenta(venta);
    await setOpenModalSell(!openModalUpdate);
  };

  const sellProduct = async (amount: number) => {
    var f = new FormData();
    f.append("nombre", nameUpdate);
    f.append("referencia", referenciaUpdate);
    f.append("precio", precioUpdate);
    f.append("categoria", categoriaUpdate);
    f.append("stock", stockUpdate);
    f.append("peso", pesoUpdate);
    f.append("venta", venta);
    f.append("METHOD", "PUT");
    await axios
      .post(URL, f, { params: { id: id_producto } })
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((producto: any) => {
          if (producto.id_producto === id_producto) {
            producto.nombre = nameUpdate;
            producto.referencia = referenciaUpdate;
            producto.precio = precioUpdate;
            producto.categoria = categoriaUpdate;
            producto.peso = pesoUpdate;
          }

          if (producto.stock > amount) {
            producto.venta = amount;
            producto.stock = producto.stock - amount;
          }
        });
        setData(dataNueva);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete process
  const deleteProduct = async (id_producto: number) => {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(URL, f, { params: { id: id_producto } })
      .then((response) => {
        setData(
          data.filter((product: any) => product.id_producto !== id_producto)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    ListProducts();
  }, []);

  console.log(data);

  return (
    <>
      <Header />
      <div className="container_screens">
        <div className="header_homepage">
          <h3 className="homepage-title">Productos</h3>
          <button
            className="button-addproduct"
            onClick={() => setOpenModal(!openModal)}
          >
            <p>Registrar Producto</p>
          </button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Referencia</th>
                <th>Precio</th>
                <th>Peso</th>
                <th>Categoria</th>
                <th>Stock</th>
                <th>Fecha Creacion</th>
                <th>Ventas</th>
                <th>Vender</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((prod: any) => (
                <tr key={prod.id_producto}>
                  <td>{prod.id_producto}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.referencia}</td>
                  <td>{prod.precio}</td>
                  <td>{prod.peso}</td>
                  <td>{prod.categoria}</td>
                  <td>{prod.stock}</td>
                  <td>{prod.fecha_creacion}</td>
                  <td>{prod.venta}</td>
                  <td>
                    <button
                      onClick={() =>
                        sellHandler(
                          prod.id_producto,
                          prod.nombre,
                          prod.referencia,
                          prod.precio,
                          prod.categoria,
                          prod.stock,
                          prod.peso,
                          prod.venta
                        )
                      }
                    >
                      Vender
                    </button>
                  </td>
                  <td>
                    <div className="actions-btn">
                      <button
                        className="btn-edit"
                        onClick={() =>
                          updateHandler(
                            prod.id_producto,
                            prod.nombre,
                            prod.referencia,
                            prod.precio,
                            prod.categoria,
                            prod.stock,
                            prod.peso
                          )
                        }
                      >
                        <i className="bx bx-edit"></i>
                      </button>
                      <button
                        className="btn-edit"
                        onClick={() => deleteProduct(prod.id_producto)}
                      >
                        <i className="bx bxs-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={openModal ? "openModal" : "closeModal"}>
        <div className="modal scale-up-center">
          <div className="modal_header">
            <h2 className="titlemodal">Registrar Productos</h2>
            <button className="modal-close" onClick={() => setOpenModal(false)}>
              <i className="bx bx-x"></i>
            </button>
          </div>

          <form action="" className="form_items">
            <div className="input">
              <label htmlFor="">Nombre del producto</label>
              <input
                list="Listname"
                type="text"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Referencia</label>
              <input
                list="Listname"
                type="text"
                placeholder=""
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Categoria</label>
              <input
                list="listCategory"
                type="text"
                placeholder=""
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Precio de adquisicion</label>
              <input
                type="number"
                placeholder=""
                value={precio}
                onChange={(e) => setPrecio(e.target.valueAsNumber)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Stock</label>
              <input
                type="number"
                id="cpf"
                placeholder=""
                value={stock}
                onChange={(e) => setStock(e.target.valueAsNumber)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Cantidad adquirida</label>
              <input
                type="number"
                placeholder=""
                value={peso}
                onChange={(e) => setPeso(e.target.valueAsNumber)}
              />
            </div>
          </form>
          <div className="modal_footer">
            <button className="btn" onClick={createProduct}>
              <h2>Guardar</h2>
            </button>
          </div>
        </div>
      </div>

      <div className={openModalUpdate ? "openModal" : "closeModal"}>
        <div className="modal scale-up-center">
          <div className="modal_header">
            <h2 className="titlemodal">Editar Producto</h2>
            <button
              className="modal-close"
              onClick={() => setOpenModalUpdate(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>

          <form action="" className="form_items">
            <div className="input">
              <label htmlFor="">Nombre del producto</label>
              <input
                list="Listname"
                type="text"
                placeholder=""
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Referencia</label>
              <input
                list="Listname"
                type="text"
                placeholder=""
                value={referenciaUpdate}
                onChange={(e) => setReferenciaUpdate(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Categoria</label>
              <input
                list="listCategory"
                type="text"
                placeholder=""
                value={categoriaUpdate}
                onChange={(e) => setCategoriaUpdate(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Precio de adquisicion</label>
              <input
                type="number"
                placeholder=""
                value={precioUpdate}
                onChange={(e) => setPrecioUpdate(e.target.valueAsNumber)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Stock</label>
              <input
                type="number"
                id="cpf"
                placeholder=""
                value={stockUpdate}
                onChange={(e) => setStockUpdate(e.target.valueAsNumber)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Peso</label>
              <input
                type="number"
                placeholder=""
                value={pesoUpdate}
                onChange={(e) => setPesoUpdate(e.target.valueAsNumber)}
              />
            </div>
          </form>
          <div className="modal_footer">
            <button className="btn" onClick={updateProduct}>
              <h2>Guardar</h2>
            </button>
          </div>
        </div>
      </div>

      <div className={openModalSell ? "openModal" : "closeModal"}>
        <div className="modal scale-up-center">
          <div className="modal_header">
            <h2 className="titlemodal">Editar Producto</h2>
            <button
              className="modal-close"
              onClick={() => setOpenModalSell(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>

          <form action="" className="form_items">
            <div className="input">
              <label htmlFor="">Nombre del producto</label>
              <input
                list="Listname"
                type="text"
                readOnly
                placeholder=""
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Stock</label>
              <input
                type="number"
                readOnly
                placeholder=""
                value={stockUpdate}
                onChange={(e) => setStockUpdate(e.target.valueAsNumber)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Cantidad</label>
              <input
                type="number"
                id="cpf"
                placeholder=""
                value={cantidad}
                onChange={(e) => setCantidad(e.target.valueAsNumber)}
              />
            </div>
          </form>
          <div className="modal_footer">
            <button className="btn" onClick={updateProduct}>
              <h2>Guardar</h2>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
