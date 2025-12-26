import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Feature } from '../../models/feature';
import { LucideAngularModule, Box, Code, Cpu, Zap, ArrowRight } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './feature-card.html',
})
export class FeatureCard {
  @Input() feature!: Feature;
  @Output() featureSelected = new EventEmitter<Feature>();

  // Map of icons available to this component
  readonly icons = {
    box: Box,
    code: Code,
    cpu: Cpu,
    zap: Zap
  };

  readonly ArrowRight = ArrowRight;

  getIcon(name: string) {
    return this.icons[name as keyof typeof this.icons] || Box;
  }

  onSelect() {
    this.featureSelected.emit(this.feature);
  }
}
