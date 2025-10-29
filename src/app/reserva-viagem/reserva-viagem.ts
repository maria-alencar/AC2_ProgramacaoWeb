import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ReservaStorageService } from '../reserva-storage';

@Component({
  selector: 'app-reserva-viagem',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './reserva-viagem.html',
  styleUrls: ['./reserva-viagem.css']
})
export class ReservaViagemComponent implements OnInit, OnDestroy {
  reservaForm!: FormGroup;
  destinos = ['Paris', 'Nova York', 'Tóquio', 'Rio de Janeiro'];
  private formSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private storageService: ReservaStorageService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarDadosAnteriores();
    this.iniciarPersistenciaAutomatica();
  }


  dataVoltaPosteriorValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      const ida = group.get('dataIda')?.value;
      const volta = group.get('dataVolta')?.value;

      if (!ida || !volta) {
        return null; 
      }

      
      if (new Date(volta) < new Date(ida)) {
      
        return { 'dataInvalida': true };
      }

      return null; 
    };
  }

  inicializarFormulario(): void {
    
    this.reservaForm = this.fb.group({
      destino: ['', Validators.required],
      dataIda: ['', Validators.required],
      dataVolta: ['', Validators.required],
      numPassageiros: [
        1,
        [Validators.required, Validators.min(1), Validators.max(5)]
      ],
      emailContato: ['', [Validators.required, Validators.email]]
    }, {
      validators: this.dataVoltaPosteriorValidator()
    });
  }


  carregarDadosAnteriores(): void {
    const dados = this.storageService.carregarDados();
    if (dados) {
      this.reservaForm.patchValue(dados);
    }
  }


  iniciarPersistenciaAutomatica(): void {
    this.formSubscription = this.reservaForm.valueChanges
      .pipe(debounceTime(500)) 
      .subscribe(dados => {
        this.storageService.salvarDados(dados);
      });
  }


  get f() {
    return this.reservaForm.controls;
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      console.log('✅ Dados de Reserva Válidos e Enviados:');
      console.log(this.reservaForm.value);

      this.storageService.limparDados();
      
      this.reservaForm.reset({ numPassageiros: 1 });
    } else {
      this.reservaForm.markAllAsTouched();
      console.log('Formulário Inválido. Verifique os erros.');
    }
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }
}