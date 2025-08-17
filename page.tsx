 <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AppAccordion
                title="Informasi Dasar"
                content={
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="kodeJenisKredit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Kode Jenis Kredit{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input
                              placeholder="Type Here"
                              {...field}
                              maxLength={5}
                              disabled={params.id !== "new"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                }
              />

              <AppAccordion
                title="Pengaturan Denda"
                content={
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Combobox
                          options={refPeriodeDenda}
                          value={form.watch("periodeDenda") ?? ""}
                          onChange={(val) => form.setValue("periodeDenda", val)}
                          title="Periode Denda"
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="gracePeriodDenda"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Grace Period Denda (hari)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                value={field.value}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value) || 0)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Combobox
                          options={refBaseDenda}
                          value={form.watch("baseDenda") ?? ""}
                          onChange={(val) => form.setValue("baseDenda", val)}
                          title="Base Denda"
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="persenDendaJt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              % Denda JT
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.000001"
                                  placeholder="0.000000"
                                  {...field}
                                  value={field.value}
                                  onChange={(e) =>
                                    field.onChange(parseFloat(e.target.value) || 0)
                                  }
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="persenDenda"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              % Denda
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.000001"
                                  placeholder="0.000000"
                                  {...field}
                                  value={field.value}
                                  onChange={(e) =>
                                    field.onChange(parseFloat(e.target.value) || 0)
                                  }
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nominalDenda"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Nominal Denda
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  {...field}
                                  value={field.value}
                                  onChange={(e) =>
                                    field.onChange(parseFloat(e.target.value) || 0)
                                  }
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                Rp
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                }
              />

              <AppAccordion
                title="Pengaturan Ludin"
                content={
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Combobox
                          options={refBungaLudin}
                          value={form.watch("bungaLudin") ?? ""}
                          onChange={(val) => form.setValue("bungaLudin", val)}
                          title="Bunga Ludin"
                        />
                      </div>

                      <div>
                        <Combobox
                          options={refPenaltiLudin}
                          value={form.watch("penaltiLudin") ?? ""}
                          onChange={(val) => form.setValue("penaltiLudin", val)}
                          title="Penalti Ludin"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="persenPenaltiLudin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              % Penalti Ludin
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  {...field}
                                  value={field.value}
                                  onChange={(e) =>
                                    field.onChange(parseFloat(e.target.value) || 0)
                                  }
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                }
              />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-[#1454AE]">
                  {isLoading ? "Saving..." : isNewData ? "Create" : "Update"}
                </Button>
              </div>
            </form>
          </Form>
