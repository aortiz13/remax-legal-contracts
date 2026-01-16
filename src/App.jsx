import React, { useState, useRef } from 'react'
import { Toaster, toast } from 'sonner'
import { generateExcel } from '@/lib/generateExcel'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, ArrowLeft, ArrowRight, Save, Building2, Key, Scale, UploadCloud, FileText, X } from "lucide-react"

function App() {
  console.log('App initializing...')
  const [step, setStep] = useState('agent') // agent, type, form
  const [formType, setFormType] = useState(null) // 'buy-sell', 'lease'

  const [agentData, setAgentData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleAgentSubmit = (e) => {
    e.preventDefault()
    if (!agentData.name.trim() || !agentData.email.trim() || !agentData.phone.trim()) {
      toast.error("Por favor completa todos los datos del agente.")
      return
    }
    setStep('type')
  }

  const handleTypeSelect = (type) => {
    setFormType(type)
    setStep('form')
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 font-sans text-slate-900">
      <Toaster richColors position="top-center" />
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-col md:flex-row items-center justify-between border-b bg-white p-6 shadow-sm rounded-xl gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
            <img
              src="https://res.cloudinary.com/dhzmkxbek/image/upload/v1765974550/ChatGPT_Image_11_dic_2025_03_45_43_p.m._oajwry.png"
              alt="RE/MAX Exclusive Logo"
              className="h-12 w-auto object-contain"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold text-slate-900">Generador de Solicitudes de Contratos</h1>
              <p className="text-xs text-slate-500">Solicitud de Redacción de Contratos</p>
            </div>
          </div>
          {step !== 'agent' && (
            <div className="text-sm text-slate-500 w-full md:w-auto text-center md:text-right border-t md:border-t-0 pt-4 md:pt-0">
              Agente: <span className="font-semibold text-slate-900">{agentData.name}</span>
            </div>
          )}
        </header>

        <main>
          {step === 'agent' && (
            <AgentForm data={agentData} onChange={setAgentData} onNext={handleAgentSubmit} />
          )}
          {step === 'type' && (
            <TypeSelection onSelect={handleTypeSelect} onBack={() => setStep('agent')} />
          )}
          {step === 'form' && formType === 'buy-sell' && (
            <BuySellForm onBack={() => setStep('type')} agentData={agentData} />
          )}
          {step === 'form' && formType === 'lease' && (
            <LeaseForm onBack={() => setStep('type')} agentData={agentData} />
          )}
        </main>
      </div>
    </div>
  )
}

function AgentForm({ data, onChange, onNext }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Card className="mx-auto max-w-lg shadow-lg border-0 ring-1 ring-slate-200">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl text-center">Datos del Agente</CardTitle>
        <CardDescription className="text-center">Ingresa tus datos para iniciar la solicitud</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onNext} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" name="name" required value={data.name} onChange={handleChange} placeholder="Ej. Juan Pérez" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" name="email" type="email" required value={data.email} onChange={handleChange} placeholder="juan.perez@remax.cl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" name="phone" type="tel" required value={data.phone} onChange={handleChange} placeholder="56 9 1234 5678" />
          </div>
          <Button type="submit" className="w-full text-base py-6">Continuar</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function TypeSelection({ onSelect, onBack }) {
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="pl-0 hover:bg-transparent hover:text-remax-blue text-slate-500">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
      <div className="grid gap-6 md:grid-cols-2">
        <Card
          className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl border-2 hover:border-remax-blue group"
          onClick={() => onSelect('buy-sell')}
        >
          <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
            <div className="p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
              <Building2 className="h-12 w-12 text-remax-blue" />
            </div>
            <div>
              <h3 className="text-xl font-bold group-hover:text-remax-blue transition-colors">Compraventa</h3>
              <p className="text-sm text-slate-500 mt-2">Redacción de contrato de promesa y compraventa de propiedades.</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl border-2 hover:border-remax-red group"
          onClick={() => onSelect('lease')}
        >
          <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
            <div className="p-4 rounded-full bg-red-50 group-hover:bg-red-100 transition-colors">
              <Key className="h-12 w-12 text-remax-red" />
            </div>
            <div>
              <h3 className="text-xl font-bold group-hover:text-remax-red transition-colors">Arriendo</h3>
              <p className="text-sm text-slate-500 mt-2">Redacción de contrato de arrendamiento habitacional o comercial.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BuySellForm({ onBack, agentData }) {
  const [numVendedores, setNumVendedores] = useState(1)
  const [numCompradores, setNumCompradores] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const processSubmission = async (formData) => {
    setIsSubmitting(true)

    try {
      // Append agent data manually since it's not in the form fields
      formData.append('agente_nombre', agentData.name)
      formData.append('agente_email', agentData.email)
      formData.append('tipo_solicitud', 'compraventa')
      formData.append('etiqueta', 'contratos')
      formData.append('tipo', 'compra/venta')

      // Remove empty files to prevent server errors (sending empty files can cause 500s)
      const fileFields = ['dominio_vigente', 'gp_certificado']
      fileFields.forEach(field => {
        const file = formData.get(field)
        if (file instanceof File && file.size === 0) {
          formData.delete(field)
        }
      })

      // Generate Excel Report
      try {
        console.log('Generando reporte Excel...')
        const excelBlob = await generateExcel(formData)
        formData.append('reporte_excel', excelBlob, 'Resumen_Operacion.xlsx')
        console.log('Reporte Excel generado y adjuntado.')
      } catch (excelError) {
        console.error('Error generando Excel:', excelError)
        // Optionally decide: fail hard or continue? 
        // User asked "send as an excel file", so maybe warning is enough or fail?
        // Let's alert but try to continue or maybe stop?
        // Given the request "send... as excel", if it fails, the request is incomplete.
        throw new Error('Falló la generación del archivo Excel: ' + excelError.message)
      }

      // Log form data for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value)
      }

      const response = await fetch('/webhook', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        toast.success('Tu solicitud ha sido enviada, el equipo legal la procesará y te enviará los detalles. No es necesario realizar ninguna otra acción.')
        onBack()
      } else {
        const errorText = await response.text()
        console.error('Server error details:', errorText)
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}. Detalles en consola.`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error(`Hubo un error: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    toast("¿Estás seguro de que deseas continuar?", {
      description: "Por favor verifica nuevamente los datos antes de enviar.",
      action: {
        label: "Enviar",
        onClick: () => processSubmission(formData),
      },
      cancel: {
        label: "Cancelar",
      },
      duration: Infinity,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
        <Button type="button" variant="ghost" onClick={onBack} className="w-full md:w-auto pl-0 hover:bg-transparent hover:text-remax-blue text-slate-500 justify-center md:justify-start">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Selección
        </Button>
      </div>

      <div className="grid gap-8">
        {/* 1. Información de la Operación */}
        <CardSection title="1. Información de la Operación">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DateField label="Fecha de cierre de negocio" name="fecha_cierre" />
            <Field label="Código RE/MAX" name="codigo_remax" placeholder="Ej. 12345" />
            <DateField label="Fecha firma PROMESA" name="fecha_promesa" />
            <DateField label="Fecha de entrega propiedad" name="fecha_entrega" />
            <DateField label="Fecha firma Escritura" name="fecha_escritura" />
          </div>
        </CardSection>

        {/* 2. Identificación de la Propiedad */}
        <CardSection title="2. Identificación de la Propiedad">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Field label="ROL Propiedad" name="rol_propiedad" placeholder="940-146" />
            <Field label="Tipo de Propiedad" name="tipo_propiedad" placeholder="Departamento, Casa..." />
            <Field label="Comuna" name="comuna" placeholder="Las Condes" />
            <Field label="Valor de Venta (Pesos)" name="valor_venta_pesos" placeholder="$ 198.000.000" />
            <Field label="Valor Referencial (UF)" name="valor_venta_uf" placeholder="UF 5.000" />
          </div>
        </CardSection>

        {/* 3. Información de las Partes */}
        <CardSection title="3. Información de las Partes">
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Vendedores</h4>
                {numVendedores < 2 && (
                  <Button size="sm" variant="outline" onClick={() => setNumVendedores(2)} type="button">
                    <Plus className="mr-2 h-3 w-3" /> Agregar Vendedor 2
                  </Button>
                )}
              </div>
              <div className="space-y-6">
                <PartyForm type="Vendedor" index={1} />
                {numVendedores >= 2 && (
                  <div className="relative pt-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-0 top-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setNumVendedores(1)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" /> Eliminar
                    </Button>
                    <PartyForm type="Vendedor" index={2} />
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Compradores</h4>
                {numCompradores < 2 && (
                  <Button size="sm" variant="outline" onClick={() => setNumCompradores(2)} type="button">
                    <Plus className="mr-2 h-3 w-3" /> Agregar Comprador 2
                  </Button>
                )}
              </div>
              <div className="space-y-6">
                <PartyForm type="Comprador" index={1} />
                {numCompradores >= 2 && (
                  <div className="relative pt-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-0 top-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setNumCompradores(1)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" /> Eliminar
                    </Button>
                    <PartyForm type="Comprador" index={2} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardSection>

        {/* 4. Acuerdos para Promesa */}
        <CardSection title="4. Acuerdos para Promesa">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Field label="Monto del Pie" name="monto_pie" placeholder="$" />
            <Field label="Monto a Financiar" name="monto_financiar" placeholder="$" />
            <Field label="Monto Contado" name="monto_contado" placeholder="$" />
          </div>

          <h4 className="text-sm font-medium mb-4 text-slate-700">Datos Bancarios (Vendedor)</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-lg border">
            <Field label="Banco" name="vendedor_banco" />
            <Field label="Ejecutivo" name="vendedor_ejecutivo" />
            <Field label="Correo" name="vendedor_correo_banco" type="email" />
            <Field label="Teléfono" name="vendedor_telefono_banco" />
          </div>

          <h4 className="text-sm font-medium mb-4 text-slate-700">Datos Bancarios (Comprador)</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border">
            <Field label="Banco" name="comprador_banco" />
            <Field label="Ejecutivo" name="comprador_ejecutivo" />
            <Field label="Correo" name="comprador_correo_banco" type="email" />
            <Field label="Teléfono" name="comprador_telefono_banco" />
          </div>
        </CardSection>

        {/* 5. Datos de Instrucciones */}
        <CardSection title="5. Datos de Instrucciones">
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 text-xs uppercase text-slate-700 font-bold">
                <tr>
                  <th className="px-3 py-3 w-40">Girador Cheque</th>
                  <th className="px-3 py-3 w-40">A La Orden De</th>
                  <th className="px-3 py-3 w-32">Banco</th>
                  <th className="px-3 py-3 w-32">Cta.Cte N°</th>
                  <th className="px-3 py-3 w-24">N° Serie</th>
                  <th className="px-3 py-3 w-24">N° Doc</th>
                  <th className="px-3 py-3 w-24">% Comision</th>
                  <th className="px-3 py-3 w-32">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { id: 'vendedor_hon', label: 'Vendedor Honorarios', def: '2% + iva' },
                  { id: 'comprador_hon', label: 'Comprador Honorarios', def: '' },
                  { id: 'garantia_comp', label: 'Garantía Comprador', def: '' },
                  { id: 'garantia_vend', label: 'Garantía Vendedor', def: '' }
                ].map((row, i) => (
                  <tr key={row.id} className="bg-white">
                    <td className="px-3 py-2 font-medium">{row.label}</td>
                    <td className="px-3 py-2"><Input name={`${row.id}_orden`} className="h-8 text-xs" /></td>
                    <td className="px-3 py-2"><Input name={`${row.id}_banco`} className="h-8 text-xs" /></td>
                    <td className="px-3 py-2"><Input name={`${row.id}_cta`} className="h-8 text-xs" /></td>
                    <td className="px-3 py-2"><Input name={`${row.id}_serie`} className="h-8 text-xs" /></td>
                    <td className="px-3 py-2"><Input name={`${row.id}_doc`} className="h-8 text-xs" /></td>
                    <td className="px-3 py-2"><Input name={`${row.id}_comision`} className="h-8 text-xs" defaultValue={row.def} /></td>
                    <td className="px-3 py-2"><Input name={`${row.id}_monto`} className="h-8 text-xs" placeholder="$" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardSection>

        {/* 6. Documentos Adjuntos */}
        <CardSection title="6. Documentación Adjunta">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FileUploadField label="Dominio Vigente" name="dominio_vigente" accept="application/pdf,image/*" />
            </div>
            <div className="space-y-4">
              <FileUploadField label="GP (Hip. y Grav.)" name="gp_certificado" accept="application/pdf,image/*" />
            </div>
          </div>
        </CardSection>

        {/* 7. Notas */}
        <CardSection title="7. Notas de Avance">
          <Textarea name="notas" placeholder="Escribe aquí cualquier nota importante sobre el avance de la operación..." className="min-h-[120px]" />
        </CardSection>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="w-full md:w-auto bg-green-600 hover:bg-green-700 py-6 text-lg px-8" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : (
              <>
                <Save className="mr-2 h-5 w-5" /> Enviar a Equipo Legal
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}

function LeaseForm({ onBack, agentData }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tenantType, setTenantType] = useState('natural') // 'natural', 'legal'
  const [hasGuarantor, setHasGuarantor] = useState(false)

  const processSubmission = async (formData) => {
    setIsSubmitting(true)

    try {
      // Append agent data
      formData.append('agente_nombre', agentData.name)
      formData.append('agente_email', agentData.email)
      formData.append('tipo_solicitud', 'arriendo')
      formData.append('etiqueta', 'contratos')
      formData.append('tipo', 'arriendo')
      formData.append('tipo_arrendatario', tenantType)
      formData.append('tiene_fiador', hasGuarantor ? 'si' : 'no')

      // Remove empty files
      const fileFields = ['dominio_vigente']
      fileFields.forEach(field => {
        const file = formData.get(field)
        if (file instanceof File && file.size === 0) {
          formData.delete(field)
        }
      })

      // Generate Excel Report
      try {
        console.log('Generando reporte Excel Arriendo...')
        const excelBlob = await generateExcel(formData)
        formData.append('reporte_excel', excelBlob, 'Ficha_Arriendo.xlsx')
      } catch (excelError) {
        console.error('Error generando Excel:', excelError)
        throw new Error('Falló la generación del archivo Excel: ' + excelError.message)
      }

      // Simulate sending for now or use the same webhook
      // console.log('Simulating submission...')
      // await new Promise(resolve => setTimeout(resolve, 1000))

      const response = await fetch('/webhook', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        toast.success('Tu solicitud ha sido enviada, el equipo legal la procesará y te enviará los detalles. No es necesario realizar ninguna otra acción.')
        onBack()
      } else {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
      }

    } catch (error) {
      console.error('Submission error:', error)
      toast.error(`Hubo un error: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    toast("¿Estás seguro de que deseas continuar?", {
      description: "Por favor verifica nuevamente los datos antes de enviar.",
      action: {
        label: "Enviar",
        onClick: () => processSubmission(formData),
      },
      cancel: {
        label: "Cancelar",
      },
      duration: Infinity,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
        <Button type="button" variant="ghost" onClick={onBack} className="w-full md:w-auto pl-0 hover:bg-transparent hover:text-remax-blue text-slate-500 justify-center md:justify-start">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Selección
        </Button>
      </div>

      <div className="grid gap-8">
        {/* 1. Datos Contrato y Propiedad */}
        <CardSection title="1. Datos del Contrato y Propiedad">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Field label="Plazo del Contrato" name="plazo_contrato" placeholder="Ej. 1 año renovable" />
            <DateField label="Fecha Inicio Arriendo" name="fecha_inicio" />
            <Field label="Canon de Arriendo" name="canon_arriendo" placeholder="$ 420.000" />
            <Field label="Documenta con Cheque (SI/NO)" name="documenta_cheque" placeholder="Indicar si documenta" />
            <Field label="Cuenta para Transferencia" name="cuenta_transferencia" className="md:col-span-2" placeholder="Banco, Tipo Cta, Número, RUT" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
            <Field label="ROL Propiedad" name="rol_propiedad" placeholder="123-45" />
            <Field label="N° Cliente Agua" name="cliente_agua" />
            <Field label="N° Cliente Luz" name="cliente_luz" />
            {/* Address isn't explicitly in the top section of screenshot but usually needed. Adding it just in case or relying on 'Comuna' in person forms. 
                 Let's add Property Address here for clarity. */}
            <Field label="Dirección de la Propiedad" name="direccion_propiedad" className="md:col-span-3" />
          </div>
        </CardSection>

        {/* 2. Arrendador */}
        <CardSection title="2. Arrendador (Propietario)">
          <LeasePersonForm type="arrendador" />
        </CardSection>

        {/* 3. Arrendatario */}
        <CardSection title="3. Arrendatario">
          <div className="flex items-center gap-4 mb-6">
            <Label>Tipo de Arrendatario:</Label>
            <div className="flex items-center gap-2 border rounded-lg p-1 bg-slate-50">
              <Button
                type="button"
                variant={tenantType === 'natural' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTenantType('natural')}
                className={tenantType === 'natural' ? 'bg-remax-blue text-white' : 'text-slate-600'}
              >
                Persona Natural
              </Button>
              <Button
                type="button"
                variant={tenantType === 'legal' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTenantType('legal')}
                className={tenantType === 'legal' ? 'bg-remax-blue text-white' : 'text-slate-600'}
              >
                Persona Jurídica
              </Button>
            </div>
          </div>

          {tenantType === 'natural' ? (
            <LeasePersonForm type="arrendatario" showJobInfo />
          ) : (
            <LeaseLegalEntityForm type="arrendatario" />
          )}
        </CardSection>

        {/* 4. Fiador Codeudor */}
        <CardSection title="4. Fiador y Codeudor Solidario">
          <div className="mb-6 flex items-center space-x-2">
            <input
              type="checkbox"
              id="has_guarantor"
              checked={hasGuarantor}
              onChange={(e) => setHasGuarantor(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-remax-blue focus:ring-remax-blue"
            />
            <Label htmlFor="has_guarantor" className="font-normal cursor-pointer">
              Incluir Fiador / Codeudor Solidario
            </Label>
          </div>

          {hasGuarantor && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
              <LeasePersonForm type="fiador" showJobInfo />
            </div>
          )}
        </CardSection>

        {/* 5. Documentos */}
        <CardSection title="5. Documentación Adjunta">
          <div className="space-y-4">
            <FileUploadField label="Dominio Vigente" name="dominio_vigente" accept="application/pdf,image/*" />
          </div>
        </CardSection>

        {/* 6. Notas */}
        <CardSection title="6. Notas Adicionales">
          <Textarea name="notas" placeholder="Información adicional relevante para el contrato..." className="min-h-[120px]" />
        </CardSection>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="w-full md:w-auto bg-green-600 hover:bg-green-700 py-6 text-lg px-8" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : (
              <>
                <Save className="mr-2 h-5 w-5" /> Enviar Solicitud de Arriendo
              </>
            )}
          </Button>
        </div>

      </div>
    </form>
  )
}

function LeasePersonForm({ type, showJobInfo = false }) {
  const prefix = type // e.g., 'arrendador', 'arrendatario', 'fiador'
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Field label="Nombres" name={`${prefix}_nombres`} className="md:col-span-2" />
        <Field label="Apellidos" name={`${prefix}_apellidos`} className="md:col-span-2" />
        <Field label="RUT / Pasaporte" name={`${prefix}_rut`} />
        <DateField label="Fecha Nacimiento" name={`${prefix}_nacimiento`} />
        <Field label="Nacionalidad" name={`${prefix}_nacionalidad`} />
        <Field label="Estado Civil" name={`${prefix}_civil`} />
        <Field label="Domicilio Particular" name={`${prefix}_direccion`} className="md:col-span-2" />
        <Field label="Comuna" name={`${prefix}_comuna`} />
        <Field label="Teléfono Celular" name={`${prefix}_telefono`} />
        {/* Added optional phone per screenshot having 2 phone fields sometimes, but standardizing on one main + email is safer unless requested. 
            Screenshot shows "TELEFONO PART." empty mostly. Let implies just one main phone. */}
        <Field label="Correo Electrónico" name={`${prefix}_email`} type="email" />
      </div>

      {showJobInfo && (
        <div className="bg-slate-50 p-4 rounded-lg border space-y-4">
          <h4 className="text-sm font-bold uppercase text-slate-500">Datos Laborales</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Ocupación" name={`${prefix}_ocupacion`} />
            <Field label="Profesión" name={`${prefix}_profesion`} />
            <Field label="Empleador" name={`${prefix}_empleador`} />
            <Field label="Cargo" name={`${prefix}_cargo`} />
            <Field label="Antigüedad" name={`${prefix}_antiguedad`} />
            <Field label="Teléfono Laboral" name={`${prefix}_telefono_lab`} />
            <Field label="Domicilio Laboral" name={`${prefix}_direccion_lab`} className="md:col-span-3" />
          </div>
        </div>
      )}
    </div>
  )
}

function LeaseLegalEntityForm({ type }) {
  const prefix = `${type}_juridica`
  const repPrefix = `${type}_juridica_rep`
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Razón Social" name={`${prefix}_razon`} className="md:col-span-2" />
        <Field label="RUT Empresa" name={`${prefix}_rut`} />
        <Field label="Domicilio Comercial" name={`${prefix}_direccion`} className="md:col-span-2" />
        <Field label="Teléfono" name={`${prefix}_telefono`} />
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border space-y-4">
        <h4 className="text-sm font-bold uppercase text-slate-500">Representante Legal</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Nombres" name={`${repPrefix}_nombres`} />
          <Field label="Apellidos" name={`${repPrefix}_apellidos`} />
          <Field label="RUT" name={`${repPrefix}_rut`} />
          <DateField label="Fecha Nacimiento" name={`${repPrefix}_nacimiento`} />
          <Field label="Nacionalidad" name={`${repPrefix}_nacionalidad`} />
          <Field label="Estado Civil" name={`${repPrefix}_civil`} />
          <Field label="Teléfono" name={`${repPrefix}_telefono`} />
          <Field label="Correo" name={`${repPrefix}_email`} type="email" />
        </div>
      </div>
    </div>
  )
}

function CardSection({ title, children }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-slate-50/50 border-b pb-4">
        <CardTitle className="text-lg text-slate-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  )
}

function Field({ label, name, type = "text", placeholder, defaultValue, className }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name} className="text-xs font-semibold uppercase text-slate-500">{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} />
    </div>
  )
}

function DateField({ label, name }) {
  const [noDate, setNoDate] = useState(false)
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="text-xs font-semibold uppercase text-slate-500">{label}</Label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`${name}_nodate`}
            name={`${name}_nodate`}
            className="h-3 w-3 rounded border-slate-300"
            checked={noDate}
            onChange={(e) => setNoDate(e.target.checked)}
          />
          <Label htmlFor={`${name}_nodate`} className="text-[10px] text-slate-500 font-normal cursor-pointer select-none">Sin Fecha</Label>
        </div>
      </div>
      <Input
        id={name}
        name={name}
        type="date"
        disabled={noDate}
        className={noDate ? "bg-slate-100 text-slate-400" : ""}
      />
    </div>
  )
}

function FileUploadField({ label, name, accept }) {
  const [file, setFile] = useState(null)
  const inputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleRemove = () => {
    setFile(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-sm font-semibold text-slate-700">{label}</Label>
      <Card className={`border-dashed border-2 ${file ? 'bg-blue-50/50 border-remax-blue/30' : 'bg-slate-50/50 border-slate-200'}`}>
        <CardContent className="flex flex-col items-center justify-center py-6 text-center">
          <Input
            ref={inputRef}
            type="file"
            name={name}
            accept={accept}
            className="hidden"
            onChange={handleFileChange}
          />

          {!file ? (
            <div className="space-y-2 cursor-pointer w-full" onClick={() => inputRef.current?.click()}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mx-auto transition-colors hover:bg-remax-blue/10 hover:text-remax-blue">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-remax-blue">Haz clic para subir un archivo</p>
                <p className="text-xs text-slate-400">PDF o Imagen (Máx 10MB)</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full max-w-sm gap-4 p-2 bg-white rounded-lg border shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="grid gap-0.5 text-left">
                  <p className="text-sm font-medium truncate max-w-[180px] text-slate-900">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button type="button" variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={handleRemove}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function PartyForm({ type, index }) {
  const prefix = `${type.toLowerCase()}_${index}`
  return (
    <div className="rounded-lg border p-5 bg-white space-y-4 relative">
      <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-slate-500 uppercase">
        {type} {index}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Field label="Nombres" name={`${prefix}_nombres`} className="md:col-span-2" />
        <Field label="Apellidos" name={`${prefix}_apellidos`} className="md:col-span-2" />
        <Field label="RUT" name={`${prefix}_rut`} />
        <Field label="Profesión / Actividad" name={`${prefix}_profesion`} />
        <Field label="Estado Civil" name={`${prefix}_estado_civil`} />
        <Field label="Dirección" name={`${prefix}_direccion`} />
        <Field label="Teléfono Celular" name={`${prefix}_telefono`} />
        <Field label="Correo" name={`${prefix}_correo`} type="email" />
      </div>
    </div>
  )
}

export default App
