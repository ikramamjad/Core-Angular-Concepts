import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature } from '../../models/feature';
import { FeatureCard } from '../feature-card/feature-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FeatureCard],
  templateUrl: './home.html',
})
export class Home {
  features: Feature[] = [
    {
      id: 1,
      name: 'Components',
      description: 'The fundamental building blocks of Angular applications. They consist of an HTML template, a TypeScript class, and CSS styles.',
      category: 'Architecture',
      iconName: 'box',
      size: 'normal'
    },
    {
      id: 2,
      name: 'Templates',
      description: 'HTML with special Angular syntax that allows you to render dynamic data and handle user interaction.',
      category: 'View',
      iconName: 'code',
      size: 'normal'
    },
    {
      id: 3,
      name: 'Dependency Injection',
      description: 'A design pattern in which a class asks for dependencies from external sources rather than creating them.',
      category: 'Architecture',
      iconName: 'cpu',
      size: 'normal'
    },
    {
      id: 4,
      name: 'Directives',
      description: 'Classes that add additional behavior to elements in your Angular applications.',
      category: 'View',
      iconName: 'zap',
      size: 'normal'
    },
    {
      id: 5,
      name: 'Signals',
      description: 'A reactive primitive for managing state that notifies interested consumers when a value changes.',
      category: 'Reactivity',
      iconName: 'radio',
      size: 'normal'
    }
  ];

  selectedFeature: Feature | null = null;

  onFeatureSelected(feature: Feature) {
    this.selectedFeature = feature;
  }
}
