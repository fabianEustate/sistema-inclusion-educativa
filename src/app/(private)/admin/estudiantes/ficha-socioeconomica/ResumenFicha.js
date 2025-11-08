"use client";
import styles from "./FichaSocioeconomica.module.css";

export default function ResumenFicha({ formData, onSubmit, onBack }) {
  const {
    datos_personales,
    formacion_academica,
    datos_clinicos,
    condicion_economica,
    ambiente_residencial,
    hobbie,
    familiares,
  } = formData;

  return (
    <div className={styles.card}>
      <h2 className={styles.sectionTitle}>
        Resumen de la ficha socioeconómica
      </h2>
      <p className={styles.subTitle}>
        Revise la información antes de guardar. Puede regresar si necesita hacer
        cambios.
      </p>

      <div className={styles.scrollableContainer}>
        {/* DATOS PERSONALES */}
        <section className={styles.resumenSection}>
          <h3>Datos personales</h3>
          <ul>
            <li>
              <strong>Correo:</strong> {datos_personales?.correo}
            </li>
            <li>
              <strong>Semestre actual:</strong>{" "}
              {datos_personales?.semestre_actual}
            </li>
            <li>
              <strong>Fecha de nacimiento:</strong>{" "}
              {datos_personales?.fecha_nacimiento}
            </li>
            <li>
              <strong>Edad:</strong> {datos_personales?.edad}
            </li>
            <li>
              <strong>Lugar de nacimiento:</strong>{" "}
              {datos_personales?.lugar_nacimiento}
            </li>
            <li>
              <strong>Estado civil:</strong> {datos_personales?.estado_civil}
            </li>
            <li>
              <strong>Sexo:</strong> {datos_personales?.sexo}
            </li>
            <li>
              <strong>Género:</strong> {datos_personales?.genero}
            </li>
            <li>
              <strong>Identidad de género:</strong>{" "}
              {datos_personales?.identidad_genero}
            </li>
            <li>
              <strong>Teléfono:</strong> {datos_personales?.telefono}
            </li>
            <li>
              <strong>Estrato:</strong> {datos_personales?.estrato}
            </li>
            <li>
              <strong>Departamento:</strong>{" "}
              {datos_personales?.departamento_origen}
            </li>
            <li>
              <strong>Municipio:</strong> {datos_personales?.municipio_origen}
            </li>
          </ul>
          {datos_personales?.foto && (
            <div className={styles.imagePreview}>
              <img
                src={datos_personales.foto || "/placeholder.svg"}
                alt="Foto del estudiante"
                width="120"
              />
            </div>
          )}
        </section>

        {/* FORMACIÓN ACADÉMICA */}
        <section className={styles.resumenSection}>
          <h3>Formación académica</h3>
          <ul>
            <li>
              <strong>Carácter del colegio:</strong>{" "}
              {formacion_academica?.caracter_colegio}
            </li>
            <li>
              <strong>Jornada:</strong> {formacion_academica?.jornada}
            </li>
            <li>
              <strong>Énfasis:</strong> {formacion_academica?.enfasis}
            </li>
            <li>
              <strong>Otros estudios:</strong>{" "}
              {formacion_academica?.otros_estudios ? "Sí" : "No"}
            </li>
            <li>
              <strong>Finalizó estudios:</strong>{" "}
              {formacion_academica?.finalizo_estudios ? "Sí" : "No"}
            </li>
            <li>
              <strong>Motivo de elección:</strong>{" "}
              {formacion_academica?.motivo_eleccion_carrera}
            </li>
          </ul>
        </section>

        {/* DATOS CLÍNICOS */}
        <section className={styles.resumenSection}>
          <h3>Datos clínicos</h3>
          <ul>
            <li>
              <strong>Padece discapacidad:</strong>{" "}
              {datos_clinicos?.padece_discapacidad ? "Sí" : "No"}
            </li>
            <li>
              <strong>Tratamiento médico:</strong>{" "}
              {datos_clinicos?.recibe_tratamiento_medico ? "Sí" : "No"}
            </li>
            <li>
              <strong>Consulta psicológica:</strong>{" "}
              {datos_clinicos?.consulta_psicologica ? "Sí" : "No"}
            </li>
            <li>
              <strong>Fuma:</strong> {datos_clinicos?.fuma ? "Sí" : "No"}
            </li>
            <li>
              <strong>Toma alcohol:</strong>{" "}
              {datos_clinicos?.toma_alcohol ? "Sí" : "No"}
            </li>
            <li>
              <strong>Planifica:</strong>{" "}
              {datos_clinicos?.planifica ? "Sí" : "No"}
            </li>
            <li>
              <strong>Vida sexual activa:</strong>{" "}
              {datos_clinicos?.vida_sexual_activa ? "Sí" : "No"}
            </li>
          </ul>
        </section>

        {/* CONDICIÓN ECONÓMICA */}
        <section className={styles.resumenSection}>
          <h3>Condición económica</h3>
          <ul>
            <li>
              <strong>Proveedor principal:</strong>{" "}
              {condicion_economica?.proveedor_recursos}
            </li>
            <li>
              <strong>Trabaja:</strong>{" "}
              {condicion_economica?.trabaja ? "Sí" : "No"}
            </li>
            <li>
              <strong>Horario:</strong> {condicion_economica?.horario_trabajo}
            </li>
            <li>
              <strong>Ingreso familiar:</strong>{" "}
              {condicion_economica?.ingreso_familiar_mensual}
            </li>
          </ul>
        </section>

        {/* AMBIENTE RESIDENCIAL */}
        <section className={styles.resumenSection}>
          <h3>Ambiente residencial</h3>
          <ul>
            <li>
              <strong>Tipo vivienda:</strong>{" "}
              {ambiente_residencial?.tipo_vivienda}
            </li>
            <li>
              <strong>Tenencia:</strong> {ambiente_residencial?.tenencia}
            </li>
            <li>
              <strong>Valor arriendo:</strong>{" "}
              {ambiente_residencial?.valor_arriendo}
            </li>
            <li>
              <strong>Hipoteca:</strong>{" "}
              {ambiente_residencial?.hipoteca ? "Sí" : "No"}
            </li>
            <li>
              <strong>Número familias:</strong>{" "}
              {ambiente_residencial?.numero_familias_vivienda}
            </li>
            <li>
              <strong>Servicios públicos:</strong>{" "}
              {(ambiente_residencial?.servicios_publicos || []).join(", ")}
            </li>
          </ul>
        </section>

        {/* HOBBIES */}
        <section className={styles.resumenSection}>
          <h3>Hobbies y participación</h3>
          <ul>
            <li>
              <strong>Actividades dentro:</strong>{" "}
              {hobbie?.actividades_dentro_universidad}
            </li>
            <li>
              <strong>Actividades fuera:</strong>{" "}
              {hobbie?.actividades_fuera_universidad}
            </li>
            <li>
              <strong>Pertenece a grupo:</strong>{" "}
              {hobbie?.pertenece_grupo ? "Sí" : "No"}
            </li>
            <li>
              <strong>Tipo de grupo:</strong> {hobbie?.tipo_grupo}
            </li>
            <li>
              <strong>Desea participar:</strong>{" "}
              {hobbie?.desea_participar_grupo ? "Sí" : "No"}
            </li>
            <li>
              <strong>Grupo deseado:</strong> {hobbie?.tipo_grupo_deseado}
            </li>
          </ul>
        </section>

        {/* FAMILIARES */}
        <section className={styles.resumenSection}>
          <h3>Familiares registrados</h3>
          {familiares?.length > 0 ? (
            familiares.map((f, i) => (
              <div key={i} className={styles.subCard}>
                <h4>Familiar {i + 1}</h4>
                <ul>
                  <li>
                    <strong>Nombre:</strong> {f.nombre_familiar}
                  </li>
                  <li>
                    <strong>Parentesco:</strong> {f.parentesco}
                  </li>
                  <li>
                    <strong>Edad:</strong> {f.edad}
                  </li>
                  <li>
                    <strong>Ocupación:</strong> {f.ocupacion}
                  </li>
                  <li>
                    <strong>Ingreso mensual:</strong> {f.ingreso_mensual}
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p>No se registraron familiares.</p>
          )}
        </section>
      </div>

      <div className={styles.actions}>
        {onBack && <button onClick={onBack}>Atrás</button>}
        <button
          className={styles.submitButton}
          onClick={() => onSubmit(formData)}
        >
          Guardar ficha
        </button>
      </div>
    </div>
  );
}
