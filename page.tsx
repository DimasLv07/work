"use client";
import { Combobox } from "@/components/combobox";
import { AppInput } from "@/components/app-input";
import SimpleBreadcrumb from "@/components/simple-breadcrumb";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  biayaPencairan: z
    .string()
    .min(1, { message: "Biaya pencairan harus dipilih" }),
  perhitunganPremi: z
    .string()
    .min(1, { message: "Perhitungan premi harus dipilih" }),
  hargaPokokPerolehan: z
    .string()
    .min(1, { message: "Harga Pokok Perolehan harus diisi" }),
  dpUangMuka: z.string().min(1, { message: "DP harus diisi" }),
  totalPembiayaan: z
    .string()
    .min(1, { message: "Total pembiayaan harus diisi" }),

  // Provisi Section
  provisiPersen: z
    .string()
    .min(1, { message: "Persentase Provisi harus diisi" }),
  provisiNominal: z.string().min(1, { message: "Nominal Provisi harus diisi" }),
  provisiAmortasi: z.boolean().optional(),

  // Admin Section
  adminPersen: z.string().min(1, { message: "Persentase Admin harus diisi" }),
  adminNominal: z.string().min(1, { message: "Nominal Admin harus diisi" }),
  adminAmortasi: z.boolean().optional(),

  // Notariel Section
  notarielPersen: z
    .string()
    .min(1, { message: "Persentase Notariel harus diisi" }),
  notarielNominal: z
    .string()
    .min(1, { message: "Nominal Notariel harus diisi" }),

  // Simpanan Jaminan, Lain-lain
  simpananJaminan: z.string().optional(),
  lainLain: z.string().optional(),

  // Material, HPP
  materialPersen: z.string().optional(),
  hppNominal: z.string().optional(),

  // Asuransi Jiwa
  asuransiJiwaPersen: z.string().optional(),
  asuransiJiwaNominal: z.string().optional(),
  asuransiJiwaDitanggungLembaga: z.boolean().optional(),
  asuransiJiwaAmortasi: z.boolean().optional(),

  // Asuransi Kendaraan
  asuransiKendaraanPersen: z.string().optional(),
  asuransiKendaraanNominal: z.string().optional(),
  asuransiKendaraanDitanggungLembaga: z.boolean().optional(),
  asuransiKendaraanAmortasi: z.boolean().optional(),

  // Asuransi Kebakaran
  asuransiKebakaranPersen: z.string().optional(),
  asuransiKebakaranNominal: z.string().optional(),
  asuransiKebakaranDitanggungLembaga: z.boolean().optional(),
  asuransiKebakaranAmortasi: z.boolean().optional(),

  // Asuransi Barang (CPM/HE)
  asuransiBarangPersen: z.string().optional(),
  asuransiBarangNominal: z.string().optional(),
  asuransiBarangDitanggungLembaga: z.boolean().optional(),
  asuransiBarangAmortasi: z.boolean().optional(),

  // Asuransi Ekspedisi (Cargo)
  asuransiEkspedisiPersen: z.string().optional(),
  asuransiEkspedisiNominal: z.string().optional(),
  asuransiEkspedisiDitanggungLembaga: z.boolean().optional(),
  asuransiEkspedisiAmortasi: z.boolean().optional(),

  // Asuransi Konstruksi (EAR)
  asuransiKonstruksiPersen: z.string().optional(),
  asuransiKonstruksiNominal: z.string().optional(),
  asuransiKonstruksiDitanggungLembaga: z.boolean().optional(),
  asuransiKonstruksiAmortasi: z.boolean().optional(),

  // Asuransi Kredit
  asuransiKreditPersen: z.string().optional(),
  asuransiKreditNominal: z.string().optional(),
  asuransiKreditDitanggungLembaga: z.boolean().optional(),
  asuransiKreditAmortasi: z.boolean().optional(),

  // Biaya Survey & Appraisal
  biayaSurvey: z.string().optional(),
  biayaAppraisal: z.string().optional(),

  // Fee (Biaya Pemasaran)
  feePersen: z.string().optional(),
  feeNominal: z.string().optional(),
  feeAmortasi: z.boolean().optional(),

  // Data Angsuran Section
  tipeAngsuran: z.string().optional(),
  alokasiBunga: z.string().optional(),
  tanggalCetak: z.string().optional(),
  jangkaWaktu: z.string().optional(),
  selectTimeOption: z.string().optional(),
  frekuensiTagihan: z.string().optional(),
  periode: z.string().optional(),
  gracePeriodePokok: z.string().optional(),
  gracePeriodeImbalHasil: z.string().optional(),
  gracePeriodeAngsuran: z.string().optional(),
  gracePeriodeCair: z.string().optional(),
  terminPokok: z.string().optional(),
  terminImbalHasil: z.string().optional(),
  angsuranTagihan: z.string().optional(),
  angsuranPokokAkhir: z.string().optional(),
  tanggalRealisasi: z.string().optional(),
  tanggalAngsuran: z.string().optional(),
  tanggalJatuhTempo: z.string().optional(),

  jenisImbalHasil: z.string().optional(),
  review: z.string().optional(),
  caraHitung: z.string().optional(),
  totalAngsuran: z.string().optional(),
  imbalHasil: z.string().optional(),
  imbalHasil2: z.string().optional(),
  imbalHasilAmortisasi: z.boolean().optional(),

  flat: z.string().optional(),
  efektif: z.string().optional(),
  ekivRate: z.string().optional(),
  ekivRateAngsuran: z.string().optional(),

  imbalHasilPersen: z.string().optional(),
  eir: z.string().optional(),

  // Parameter Denda, Penalti, Bonus
  dendaPersen: z.string().optional(),
  dendaNominal: z.string().optional(),
  dendaJatuhTempo: z.string().optional(),
  dendaPokok: z.string().optional(),
  dendaImbalHasil: z.string().optional(),
  dendaGracePeriode: z.string().optional(),
  bonusPersen: z.string().optional(),

  // Biaya Tambahan Section
  adminAngsuranPersen: z.string().optional(),
  adminAngsuranNominal: z.string().optional(),
  feeAngsuranPersen: z.string().optional(),
  feeAngsuranNominal: z.string().optional(),
  ppnAngsuranPersen: z.string().optional(),
  ppnAngsuranNominal: z.string().optional(),
  pph23AngsuranPersen: z.string().optional(),
  pph23AngsuranNominal: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function FormTambah() {
  const biayaPencairanOptions = [
    { kode: "dp-biaya-potong", deskripsi: "DP dan Biaya Potong Plafond" },
    { kode: "dp-biaya-kantor", deskripsi: "DP dan Biaya (Ke Kantor) Dimuka" },
  ];
  const perhitunganPremiOptions = [
    { kode: "persentase-pokok", deskripsi: "Persentase Pokok Pinjaman" },
    { kode: "persentase-hpp", deskripsi: "Persentase HPP" },
  ];

  const jenisImbalHasilOptions = [
    { kode: "fixed", deskripsi: "Fixed" },
    { kode: "progressive", deskripsi: "Progressive" },
    { kode: "floating", deskripsi: "Floating" },
  ];

  const caraHitungOptions = [
    { kode: "fixed", deskripsi: "Fixed" },
    { kode: "progressive", deskripsi: "Progressive" },
    { kode: "floating", deskripsi: "Floating" },
  ];
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      biayaPencairan: "",
      perhitunganPremi: "",
      hargaPokokPerolehan: "",
      dpUangMuka: "",
      totalPembiayaan: "",
      provisiAmortasi: false,
      // Initialize all other fields
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast({
      title: "Success!",
      description: "Data jumlah pembiayaan berhasil disimpan.",
    });
    router.push("/master/barang");
  };

  return (
    <div className="flex flex-col space-y-6 p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <SimpleBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "FOS", href: "/fos" },
            {
              label: "Pengajuan Pembiayaan",
              href: "/fos/pengajuan-pembiayaan",
            },
            {
              label: "Jumlah Pembiayaan & Potongan",
              href: "/fos/pengajuan-pembiayaan/jumlah-pembiayaan-potongan",
            },
          ]}
        />
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4 text-[#525252]">
            Tambah Jumlah Pembiayaan
          </h2>
          <div className="overflow-x-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Jumlah Pembiayaan & Potongan Section */}

                <div className="border-2 border-solid p-4 rounded-lg">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Jumlah Pembiayaan & Potongan
                  </h3>
                  <div className="mb-3">
                    <Combobox
                      options={biayaPencairanOptions}
                      value={form.watch("biayaPencairan") ?? ""}
                      onChange={(val) => form.setValue("biayaPencairan", val)}
                      title="Biaya Pencairan"
                      optionLabelKey="deskripsi"
                      optionValueKey="kode"
                    />
                  </div>
                  <div className="mb-3">
                    <Combobox
                      options={perhitunganPremiOptions}
                      value={form.watch("perhitunganPremi") ?? ""}
                      onChange={(val) => form.setValue("perhitunganPremi", val)}
                      title="Perhitungan Premi"
                      optionLabelKey="deskripsi"
                      optionValueKey="kode"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="hargaPokokPerolehan"
                      label="Harga Pokok Perolehan"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="dpUangMuka"
                      label="DP (Uang Muka)"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="totalPembiayaan"
                      label="Total Pembiayaan"
                      control={form.control}
                      type="number"
                    />
                  </div>

                  {/* --- Provisi, Admin, Notariel Section in Grid --- */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
                    <div>
                      {/* Don't transform, has suffix */}
                      <FormField
                        control={form.control}
                        name="provisiPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Presentase Provisi
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="provisiNominal"
                        label="Nominal Provisi"
                        control={form.control}
                        type="number"
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Don't transform, checkbox */}
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi Provisi
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
                    <div>
                      {/* Don't transform, has suffix */}
                      <FormField
                        control={form.control}
                        name="adminPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Presentase Admin
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="adminNominal"
                        label="Nominal Admin"
                        control={form.control}
                        type="number"
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Don't transform, checkbox */}
                      <FormField
                        control={form.control}
                        name="adminAmortasi"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi Admin
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                    <div>
                      {/* Don't transform, has suffix */}
                      <FormField
                        control={form.control}
                        name="notarielPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Presentase Notariel
                            </FormLabel>
                            <div className="relative w-1/2">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="notarielNominal"
                        label="Nominal Notariel"
                        control={form.control}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="simpananJaminan"
                      label="Simpanan Jaminan"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="lainLain"
                      label="Lain-lain"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    {/* Don't transform, has suffix */}
                    <FormField
                      control={form.control}
                      name="materialPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Material (%)
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8"
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="hppNominal"
                      label="HPP (Nominal)"
                      control={form.control}
                      type="number"
                    />
                  </div>

                  {/* --- Asuransi Jiwa Section --- */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
                    <div>
                      {/* Don't transform, has suffix */}
                      <FormField
                        control={form.control}
                        name="asuransiJiwaPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Asuransi Jiwa
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="asuransiJiwaNominal"
                        label="Nominal Asuransi Jiwa"
                        control={form.control}
                        type="number"
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Don't transform, checkbox */}
                      <FormField
                        control={form.control}
                        name="asuransiJiwaDitanggungLembaga"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga (Asuransi Jiwa)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Don't transform, checkbox */}
                      <FormField
                        control={form.control}
                        name="asuransiJiwaAmortasi"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi (Asuransi Jiwa)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* --- Asuransi Barang (CPM/HE) Section --- */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
                    <div>
                      {/* Suffix: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiBarangPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Asuransi Barang (CPM/HE)
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="asuransiBarangNominal"
                        label="Nominal Asuransi Barang (CPM/HE)"
                        control={form.control}
                        type="number"
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Checkbox: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiBarangDitanggungLembaga"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga (Asuransi Barang)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Checkbox: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiBarangAmortasi"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi (Asuransi Barang)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* --- Asuransi Ekspedisi (Cargo) Section --- */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
                    <div>
                      {/* Suffix: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiEkspedisiPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Asuransi Ekspedisi (Cargo)
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="asuransiEkspedisiNominal"
                        label="Nominal Asuransi Ekspedisi (Cargo)"
                        control={form.control}
                        type="number"
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Checkbox: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiEkspedisiDitanggungLembaga"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga (Asuransi Ekspedisi)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Checkbox: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiEkspedisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi (Asuransi Ekspedisi)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* --- Asuransi Konstruksi (EAR) Section --- */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
                    <div>
                      {/* Suffix: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiKonstruksiPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Asuransi Konstruksi (EAR)
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="asuransiKonstruksiNominal"
                        label="Nominal Asuransi Konstruksi (EAR)"
                        control={form.control}
                        type="number"
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Checkbox: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiKonstruksiDitanggungLembaga"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga (Asuransi Konstruksi)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Checkbox: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiKonstruksiAmortasi"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi (Asuransi Konstruksi)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* --- Asuransi Kredit Section --- */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
                    <div>
                      {/* Suffix: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiKreditPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Asuransi Kredit
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="asuransiKreditNominal"
                        label="Nominal Asuransi Kredit"
                        control={form.control}
                        type="number"
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Checkbox: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiKreditDitanggungLembaga"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga (Asuransi Kredit)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Checkbox: don't transform */}
                      <FormField
                        control={form.control}
                        name="asuransiKreditAmortasi"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi (Asuransi Kredit)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* --- Asuransi Kendaraan Section --- */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
                    <div>
                      {/* Don't transform, has suffix */}
                      <FormField
                        control={form.control}
                        name="asuransiKendaraanPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Asuransi Kendaraan
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="asuransiKendaraanNominal"
                        label="Nominal Asuransi Kendaraan"
                        control={form.control}
                        type="number"
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      <FormField
                        control={form.control}
                        name="asuransiKendaraanDitanggungLembaga"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga (Asuransi Kendaraan)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      <FormField
                        control={form.control}
                        name="asuransiKendaraanAmortasi"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi (Asuransi Kendaraan)
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Repeat for asuransiKebakaran, asuransiBarang, asuransiEkspedisi, asuransiKonstruksi, asuransiKredit as needed, following the same pattern */}

                  <div className="mb-3">
                    <AppInput
                      name="biayaSurvey"
                      label="Biaya Survey"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="biayaAppraisal"
                      label="Biaya Appraisal"
                      control={form.control}
                      type="number"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
                    <AppInput
                      name="feePersen"
                      label="Fee (Biaya Pemasaran) (%)"
                      control={form.control}
                      type="number"
                    />
                    <AppInput
                      name="feeNominal"
                      label="Nominal Fee (Biaya Pemasaran)"
                      control={form.control}
                      type="number"
                    />
                    <FormField
                      control={form.control}
                      name="feeAmortasi"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <div className="flex items-center space-x-2 h-full">
                            <FormControl>
                              <Input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="w-4 h-4"
                              />
                            </FormControl>
                            <FormLabel className="text-[#525252] m-0">
                              Amortasi (Fee/Marketing)
                            </FormLabel>
                          </div>
                          <FormMessage className="mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-2 border-solid p-4 rounded-lg">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Data Angsuran
                  </h3>

                  <div className="mb-3">
                    <AppInput
                      name="tipeAngsuran"
                      label="Tipe Angsuran"
                      control={form.control}
                      type="text"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="alokasiBunga"
                      label="Alokasi Bunga"
                      control={form.control}
                      type="text"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="tanggalCetak"
                      label="Tanggal Cetak"
                      control={form.control}
                      type="date"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="jangkaWaktu"
                      label="Jangka Waktu"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="selectTimeOption"
                      label="Pilihan Waktu"
                      control={form.control}
                      type="text"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="frekuensiTagihan"
                      label="Frekuensi Tagihan Dalam Sebulan"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="periode"
                      label="Periode"
                      control={form.control}
                      type="text"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="gracePeriodePokok"
                      label="Grace Periode Pokok"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="gracePeriodeImbalHasil"
                      label="Grace Periode Imbal Hasil"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="gracePeriodeAngsuran"
                      label="Grace Periode Angsuran"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="gracePeriodeCair"
                      label="Grace Periode Cair/PRK"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="terminPokok"
                      label="Termin Pokok"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="terminImbalHasil"
                      label="Termin Imbal Hasil"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="angsuranTagihan"
                      label="Angsuran Tagihan"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="angsuranPokokAkhir"
                      label="Angsuran Pokok Akhir"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="tanggalRealisasi"
                      label="Tanggal Realisasi"
                      control={form.control}
                      type="date"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="tanggalAngsuran"
                      label="Tanggal Angsuran"
                      control={form.control}
                      type="date"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="tanggalJatuhTempo"
                      label="Tanggal Jatuh Tempo"
                      control={form.control}
                      type="date"
                    />
                  </div>
                  {/* --- Parameter Denda, Penalti, Bonus Section --- */}

                  {/* --- Biaya Tambahan Section --- */}
                </div>
                <div className="border-2 border-solid p-4 rounded-lg">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Ekiv. Rate
                  </h3>
                  <div className="mb-3">
                    <Combobox
                      options={jenisImbalHasilOptions}
                      value={form.watch("jenisImbalHasil") ?? ""}
                      onChange={(val) => form.setValue("jenisImbalHasil", val)}
                      title="Jenis Imbal Hasil"
                      optionLabelKey="deskripsi"
                      optionValueKey="kode"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="hargaPokokPerolehan"
                      label="Review | Bulan"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <Combobox
                      options={caraHitungOptions}
                      value={form.watch("caraHitung") ?? ""}
                      onChange={(val) => form.setValue("caraHitung", val)}
                      title="Cara Hitung"
                      optionLabelKey="deskripsi"
                      optionValueKey="kode"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="totalAngsuran"
                      label="Total Angsuran"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
                    <div className="mb-3">
                      <AppInput
                        name="imbalHasil"
                        label="Imbal Hasil"
                        control={form.control}
                        type="number"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="invisible" htmlFor="">
                        a
                      </label>
                      <AppInput
                        name="imbalHasil2"
                        label={""}
                        control={form.control}
                        type="number"
                      />
                    </div>
                    <div className="flex items-center h-full pt-7">
                      {/* Don't transform, checkbox */}
                      <FormField
                        control={form.control}
                        name="imbalHasilAmortisasi"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex items-center space-x-2 h-full">
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="flat"
                      label="Flat %/Tahun"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="efektif"
                      label="Efektif %/Tahun"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                    <div className="mb-3">
                      <AppInput
                        name="ekivRate"
                        label="Ekiv. Rate %/Tahun"
                        control={form.control}
                        type="number"
                      />
                    </div>
                    <div className="mb-3">
                      <AppInput
                        name="ekivRateAngsuran"
                        label="Ekiv. Rate %/Angsuran"
                        control={form.control}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="imbalHasil"
                      label="Imbal Hasil %"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="eir"
                      label="EIR %"
                      control={form.control}
                      type="number"
                    />
                  </div>
                </div>

                <div className="border-2 border-solid p-4 rounded-lg">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Parameter Denda, Penalti Pelunasan Dini dan Bonus
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                    <div>
                      {/* Don't transform, has suffix */}
                      <FormField
                        control={form.control}
                        name="dendaPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Denda
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="dendaNominal"
                        label="Nominal Denda"
                        control={form.control}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
                    <AppInput
                      name="dendaJatuhTempo"
                      label="Jatuh Tempo (Denda)"
                      control={form.control}
                      type="number"
                    />
                    <AppInput
                      name="dendaPokok"
                      label="Pokok (Denda)"
                      control={form.control}
                      type="number"
                    />
                    <AppInput
                      name="dendaImbalHasil"
                      label="Imbal Hasil (Denda)"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    <AppInput
                      name="dendaGracePeriode"
                      label="Grace Periode Denda"
                      control={form.control}
                      type="number"
                    />
                  </div>
                  <div className="mb-3">
                    {/* Don't transform, has suffix */}
                    <FormField
                      control={form.control}
                      name="bonusPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Persentase Bonus
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8"
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-2 border-solid p-4 rounded-lg">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Admin Per Angsuran
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                    <div>
                      {/* Don't transform, has suffix */}
                      <FormField
                        control={form.control}
                        name="adminAngsuranPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Admin per Angsuran
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="adminAngsuranNominal"
                        label="Nominal Admin per Angsuran"
                        control={form.control}
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-2 border-solid p-4 rounded-lg">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Fee Per Angsuran
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                    <div>
                      {/* Don't transform, has suffix */}
                      <FormField
                        control={form.control}
                        name="feeAngsuranPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Fee per Angsuran
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="feeAngsuranNominal"
                        label="Nominal Fee per Angsuran"
                        control={form.control}
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-2 border-solid p-4 rounded-lg">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Pajak
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                    <div>
                      {/* Don't transform, has suffix */}
                      <FormField
                        control={form.control}
                        name="ppnAngsuranPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase PPN per Angsuran
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="ppnAngsuranNominal"
                        label="Nominal PPN per Angsuran"
                        control={form.control}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                    <div>
                      {/* Don't transform, has suffix */}
                      <FormField
                        control={form.control}
                        name="pph23AngsuranPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase PPh23 per Angsuran
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8"
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <AppInput
                        name="pph23AngsuranNominal"
                        label="Nominal PPh23 per Angsuran"
                        control={form.control}
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                {/* Data Angsuran Section */}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    className="bg-gray-500 text-white hover:bg-gray-600"
                    onClick={() => router.back()}
                  >
                    Kembali
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Simpan
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
